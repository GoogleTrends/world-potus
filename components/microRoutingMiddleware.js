import { createHashHistory as createHistory } from 'history'
import { mapToObject, mapToArray, flattened } from './utils'

const BYPASS_FLAG = '__bypassBikeRoutingMiddleware'

function makeActionBypasser(action) {
  // Not risky to mutate this Action object since it is not re-used.
  action[BYPASS_FLAG] = true
  return action
}

function isActionBypasser(action) {
  return Boolean(action[BYPASS_FLAG])
}

function makeUrl(urlSegments = null) {
  if (!urlSegments || urlSegments.length === 0) return '/'
  if (!Array.isArray(urlSegments)) return urlSegments
  return `/${urlSegments.join('/')}/`
}

export function applyUrlSelectors(state, urlConfig) {
  return urlConfig::mapToObject(cfg => cfg.selector(state))
}

export function getUrlSelectors(urlConfig) {
  return urlConfig::mapToObject(cfg => cfg.selector)
}

function urlSegmentsToActions(urlSegments, urlConfig) {
  const actions = urlConfig::mapToArray((cfg, key) => cfg.action(urlSegments[key]))::flattened()
  return actions
}

function listenPop(onPopFunction) {
  const history = this
  return history.listen((location, action) => {
    action = action || location.action // History legacy compatibility
    if (action !== 'POP') return
    onPopFunction(location)
  })
}

function onNotFoundDefault(url, { pushUrl, replaceUrl }) {
  console.warn(`Url ${url} not found, redirecting to /`)
  replaceUrl('/')
}

export default function createRoutingMiddleware(config) {
  const {
    urlConfig,
    pageSelector,
    subStateToUrl,
    urlToSegments,
    onNotFound = onNotFoundDefault,
  } = config
  const history = createHistory()
  const pushUrl = (url) => { history.push(url) }
  const replaceUrl = (url) => { history.replace(url) }

  return store => {
    const dispatchUrlActionsOnLocation = (location) => {
      const url = location.pathname
      const urlSegments = urlToSegments(url)
      if (urlSegments === null) return onNotFound(url, { pushUrl, replaceUrl })
      urlSegmentsToActions(urlSegments, urlConfig)
      .map(makeActionBypasser)
      .forEach(store.dispatch)
    }

    history::listenPop(dispatchUrlActionsOnLocation)

    dispatchUrlActionsOnLocation(history.location)

    let oldPage = null

    return next => action => {
      if (isActionBypasser(action)) return next(action)

      const prevState = store.getState()
      const result = next(action)
      const nextState = store.getState()

      const isStateChanged = (selector) => selector(prevState) !== selector(nextState)
      const changedAnything = urlConfig::mapToArray(u => u.selector).some(isStateChanged)

      if (!changedAnything) return result

      const nextUrl = makeUrl(subStateToUrl(applyUrlSelectors(nextState, urlConfig)))
      const prevPage = oldPage || pageSelector(prevState)
      const nextPage = pageSelector(nextState)

      prevPage === nextPage
        ? replaceUrl(nextUrl)
        : pushUrl(nextUrl)

      oldPage = nextPage

      return result
    }
  }
}

function getCurrentWindowParams(win) {
  return {
    width: win.innerWidth,
    height: win.innerHeight,

    isDesktop: win.matchMedia("(min-width: 1024px)").matches,
    get isMobi() {return !this.isDesktop },
    isMobiLandscape: win.matchMedia("(max-width: 1024px) and (max-height: 550px) and (orientation: landscape)").matches,
    get desktop() { return this.isDesktop },
  }
}

const initialState = getCurrentWindowParams(window)

export function reducer(state = initialState, action) {
  if (action.type === 'SCREEN_RESIZE') {
    return {
      ...state,
      ...action,
    }
  }
  return state
}

function windowResizeActionCreator() {
  return {
    type: 'SCREEN_RESIZE',
    ...getCurrentWindowParams(window),
  }
}

import debounce from 'lodash/debounce'

export default function resizedWindowMiddleware(store) {
  window.addEventListener('resize', debounce(() => {
    store.dispatch(windowResizeActionCreator())
  }, 500))

  return next => action => next(action)
}

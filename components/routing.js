import { nullOr, pickKeys } from './utils'
import { getUrlSelectors } from 'microRoutingMiddleware'
import { createSelector } from 'reselect'

const CANDIDATE_CODES = {
  HC: 'clinton',
  DT: 'trump',
  clinton: 'HC',
  trump: 'DT',
}

function translateGeoViz(param) {
  if (param === true) return 'countries'
  if (param === false) return 'world-regions'
  if (param === 'countries') return true
  if (param === 'world-regions') return false
  return false
}

function translateUsaVisibility(param) {
  if (param === true) return 'with-usa'
  if (param === false) return 'outside-usa'
  if (param === 'with-usa') return true
  if (param === 'outside-usa') return false
  return false
}

export const urlConfig = {
  candidate: {
    selector: state => state.quotes.candidate::nullOr(c => CANDIDATE_CODES[c]),
    action: candidate => ({ type: 'CHANGE_CANDIDATE', candidate: candidate::nullOr(c => CANDIDATE_CODES[c]) }),
  },
  topic: {
    selector: state => state.menu.topicSlug::nullOr(t => t.replace(/_/g, '-')),
    action: topicSlug => ({ type: 'CHANGE_TOPIC', topicSlug: (topicSlug || 'candidates').replace(/-/g, '_') }),
  },
  country: {
    selector: state => state.country::nullOr(c => c.toLowerCase()),
    action: country => ({ type: 'CHANGE_COUNTRY', countryCode: country::nullOr(c => c.toUpperCase()) }),
  },
  geoViz: {
    selector: state => translateGeoViz(state.gooeyBubbles.expanded),
    action: geoViz => ({ type: 'CHANGE_GEOVIZ', expanded: translateGeoViz(geoViz) }),
  },
  vizType: {
    selector: state => state.view.visualizationType.toLowerCase(),
    action: vizType => ({ type: 'CHANGE_VISUALIZATION', visualizationType: (vizType || 'BLOB').toUpperCase() }),
  },
  usaVisibility: {
    selector: state => translateUsaVisibility(state.gooeyBubbles.usDataEnabled),
    action: usaVisibility => ({ type: 'CHANGE_US_DATA', usDataEnabled: translateUsaVisibility(usaVisibility) }),
  },
}

const segmentsSelectors = getUrlSelectors(urlConfig)::pickKeys(['candidate', 'topic', 'country'])

export const pageSelector = createSelector(
  segmentsSelectors,

  (candidate, topic, country) => {
    if (candidate === null) {
      return `landing`
    }
    if (topic === null) {
      return `candidate-${candidate}`
    }
    if (country === null) {
      return `topic-${candidate}`
    }
    if (country !== null) {
      return `country`
    }
    return 404
  }
)

export function subStateToUrl(subState) {
  const { candidate, topic, country, vizType, geoViz, usaVisibility } = subState

  if (candidate === null) {
    return '/'
  }
  if (country === null) {
    return [candidate, topic, geoViz, vizType, usaVisibility]
  }
  if (country !== null) {
    return [candidate, topic, country]
  }
  console.error("microRouting/stateToUrl failed:", subState)
}

const URL_RE = /\/(?:(trump|clinton)(?:\/([\w-]+)(?:\/([\w-]+)(?:\/([\w-]+)(?:\/([\w-]+))?)?)?)?)?/
export function urlToSegments(url) {
  const [, candidate = null, topic = null, geoVizOrCountry = null, vizType = null, usaVisibility = null] = url.match(URL_RE)
  let country = null
  let geoViz = geoVizOrCountry
  const isCountryInURL = geoVizOrCountry && geoVizOrCountry.length === 2
  if (isCountryInURL) {
    country = geoVizOrCountry
    geoViz = 'countries'
  }
  return {
    candidate,
    topic,
    country,
    vizType,
    geoViz,
    usaVisibility,
  }
}

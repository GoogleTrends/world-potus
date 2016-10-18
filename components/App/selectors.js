import { createSelector } from 'reselect'
import { BUBBLES_COLORS } from 'constants'

const DEFAULT_TOPIC = {
  slug: 'candidates',
  data: {},
}

function addColorToGeoDatum(geoDatum) {
  const isContinent = !geoDatum.hasOwnProperty('continentGeoCode')
  const colors =  BUBBLES_COLORS.COUNTRIES
  const continentCode = isContinent ? geoDatum.geoCode : geoDatum.continentGeoCode

  return {
    ...geoDatum,
    color: colors[continentCode],
  }
}

function generateEmptyCountry(geoCode) {
  return {
    geoCode,
    value: 0,
    historicValue: 0,
    continentGeoCode: '',
  }
}

const usTopicsListSelector = state => state.gooeyBubbles.geographicData.topics

const usOrNotTopicsListSelector = createSelector(
  state => state.gooeyBubbles.usDataEnabled,
  usTopicsListSelector,
  state => state.gooeyBubbles.geographicDataNoUs.topics,

  (usDataEnabled, topicsWithUs, topicsNoUs) => (usDataEnabled ? topicsWithUs : topicsNoUs) || []
)

export const topicsListSelector = createSelector(
  usOrNotTopicsListSelector,
  state => state.menu.topicSlug || DEFAULT_TOPIC.slug,

  (topicsList, selectedTopicSlug) => {
    const topicsListEnriched = topicsList.map(topic => ({
      ...topic,
      isSelected: topic.slug === selectedTopicSlug,
    }))
    return topicsListEnriched
  }
)

export const selectedTopicSelector = createSelector(
  topicsListSelector,

  (topicsList) => {
    const selectedTopic = topicsList.find(t => t.isSelected) || DEFAULT_TOPIC
    return selectedTopic
  }
)

const selectedCandidateSelector = (state) => state.quotes.candidate || 'ALL'

export const geographicDataSelector = createSelector(
  selectedCandidateSelector,
  state => selectedTopicSelector(state).data,
  state => state.gooeyBubbles.expanded ? 'countriesData' : 'continentsData',

  (selectedCandidate, topicGeoData, geoType) => {
    if (!Object.keys(topicGeoData).length) return []
    const geoData = topicGeoData[selectedCandidate][geoType]
    const geoDataWithColors = geoData.map(addColorToGeoDatum)
    return geoDataWithColors
  }
)

// countryDataSelector = (state, countryCode) => ...
export const countryDataSelector = createSelector(
  (_, countryCode) => countryCode,
  selectedCandidateSelector,
  usTopicsListSelector,

  (countryCode, selectedCandidate, topicsData) => {
    if (!topicsData || !topicsData.length) return []
    const countryData = topicsData.map((topic) => {
      const countriesData = topic.data[selectedCandidate].countriesData
      const countriesDataByCountry = new Map(countriesData.map(country => ([country.geoCode, country])))
      return {
        countryData: countriesDataByCountry.get(countryCode) || generateEmptyCountry(countryCode),
        usaData: countriesDataByCountry.get('US') || generateEmptyCountry(countryCode),
        slug: topic.slug,
      }
    })
    return countryData
  }
)

// geographicDataSelectorByTopicId = (state, topicId) => ...
export const geographicDataSelectorByTopicId = createSelector(
  (_, topicId) => topicId,
  selectedCandidateSelector,
  usTopicsListSelector,

  (topicId, selectedCandidate, topicsList) => {
    if (!topicsList) return []
    const selectedTopicId = topicId || 0
    const selectedTopic = topicsList[selectedTopicId]
    const topicGeoData = selectedTopic.data
    if (!Object.keys(topicGeoData).length) return []
    const geoType = 'continentsData'
    const geoData = topicGeoData[selectedCandidate][geoType]
    const geoDataWithColors = geoData.map(addColorToGeoDatum)
    return geoDataWithColors
  }
)

export const averageDataSelector = createSelector(
  selectedCandidateSelector,
  usTopicsListSelector,

  (selectedCandidate, topicsData) => {
    if (!topicsData || !topicsData.length) return {}
    const averageDataByTopic = topicsData.reduce((obj, topic) => {
      obj[topic.slug] = topic.data[selectedCandidate].topicAvg
      return obj
    }, {})
    return averageDataByTopic
  }
)

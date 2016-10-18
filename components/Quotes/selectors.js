import { createSelector } from 'reselect'
import { selectedTopicSelector } from 'App/selectors'

const EMPTY_QUOTES_DATA = {'HC': [], 'DT': []}

export const quotesDataSelector = createSelector(
  state => state.quotes.quotesData,
  selectedTopicSelector,

  (quotesData, selectedTopic) => {
    const slug = selectedTopic.slug
    if (!quotesData.topics || !quotesData.topics[slug]) return EMPTY_QUOTES_DATA
    return quotesData.topics[slug].data
  }
)

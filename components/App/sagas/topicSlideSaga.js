import { take, select, put, call } from 'redux-saga/effects'
import { topicsListSelector } from 'App/selectors'

export function * watchForTopicSlide() {
  while (true) {
    const action = yield take(['INCREMENT_TOPIC', 'DECREMENT_TOPIC'])
    const topicList = yield call(topicListLoaded)
    const topicId = topicList.findIndex(topic => topic.isSelected)
    if (topicId === -1) return
    const direction = (action.type === 'INCREMENT_TOPIC') ? +1 : -1
    const newTopicId = cycleNumber(topicId + direction, topicList.length)
    const newTopicSlug = topicList[newTopicId].slug
    yield put({ type: 'CHANGE_TOPIC', topicSlug: newTopicSlug })
  }
}

function * topicListLoaded() {
  const topicList = yield select(topicsListSelector)
  const isDataLoaded = topicList.length > 0
  if (!isDataLoaded) {
    yield take('REQUEST_DATA_SUCCESS')
    return yield select(topicsListSelector)
  }
  return topicList
}

function cycleNumber(num, max) {
  // Cycle through negative numbers or bigger than `max`
  return (max + num) % max
}

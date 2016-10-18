import { fork } from 'redux-saga/effects'
import { watchFetchData } from './dataSaga'
import { watchForTopicSlide } from './topicSlideSaga'

export default function * rootSaga() {
  yield fork(watchFetchData)
  yield fork(watchForTopicSlide)
}

import { take, call, put } from 'redux-saga/effects'
import { onFetchSuccess, onFetchFailure, REQUEST_DATA } from '../actions/dataActions'
import LoadingActions from '../actions/loadingActions'
import Api from '../api'

function * fetchData(bubblesConfig) {
  yield put(LoadingActions.onLoading())
  console.log('%c Fetching Data ', 'background: lightblue; color:black;', 'bubblesConfig:', bubblesConfig)

  try {
    const [topicsData, noUsTopicsData] = yield [call(Api.requestTopicsData), call(Api.requestNoUsTopicsData)]
    yield put(onFetchSuccess(topicsData, noUsTopicsData, bubblesConfig))
  } catch (error) {
    yield put(onFetchFailure(error))
    throw error
  }
  yield put(LoadingActions.onLoadingDone())
}

export function * watchFetchData() {
  while (true) {
    const bubblesAction = yield take(REQUEST_DATA)
    yield call(fetchData, bubblesAction.config)
  }
}

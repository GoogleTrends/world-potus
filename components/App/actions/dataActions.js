export const REQUEST_DATA = 'REQUEST_DATA'
export const REQUEST_DATA_SUCCESS = 'REQUEST_DATA_SUCCESS'
export const REQUEST_DATA_FAILURE = 'REQUEST_DATA_FAILURE'

export const onRequestData = (config) => (
  { type: REQUEST_DATA, config }
)

export const onFetchSuccess = (topicsData, noUsTopicsData, config) => (
  { type: REQUEST_DATA_SUCCESS, topicsData, noUsTopicsData, config }
)

export const onFetchFailure = (error) => (
  { type: REQUEST_DATA_FAILURE, error: `${error}` }
)

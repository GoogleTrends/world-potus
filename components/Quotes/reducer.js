import { REQUEST_DATA_SUCCESS, REQUEST_DATA_FAILURE } from 'App/actions/dataActions'

const init = {
  candidate: null,
  quotesData: [],
  expandedQuotes: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case 'CHANGE_CANDIDATE':
      return {...state, candidate: action.candidate}
    case 'TOGGLE_EXPANDED_QUOTES':
      return {...state, expandedQuotes: !state.expandedQuotes}
    case REQUEST_DATA_SUCCESS:
      return { ...state, quotesData: action.quotesData }
    case REQUEST_DATA_FAILURE:
      return { ...state, quotesData: init.quotesData }
  }
  return state
}

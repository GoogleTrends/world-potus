import { REQUEST_DATA_SUCCESS, REQUEST_DATA_FAILURE } from 'App/actions/dataActions'

const init = {
  geographicData: {},
  geographicDataNoUs: {},
  expanded: false,
  usDataEnabled: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case REQUEST_DATA_SUCCESS:
      return { ...state, geographicData: action.topicsData, geographicDataNoUs: action.noUsTopicsData }
    case REQUEST_DATA_FAILURE:
      return { ...state, geographicData: init.geographicData }
    case 'TOGGLE_GEOVIZ':
      return { ...state, expanded: !state.expanded }
    case 'CHANGE_GEOVIZ':
      return { ...state, expanded: action.expanded }
    case 'TOGGLE_US_DATA':
      return { ...state, usDataEnabled: !state.usDataEnabled }
    case 'CHANGE_US_DATA':
      return { ...state, usDataEnabled: action.usDataEnabled }
  }
  return state
}

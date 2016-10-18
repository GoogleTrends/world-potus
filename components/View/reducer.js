let init = {
  visualizationType: 'BLOB',
  tutorial: !window.localStorage.getItem('view_tutorial'),
}

const VIZ_TYPES_CYCLE = {
  BLOB: {next: 'ATLAS',  prev: null},
  ATLAS: {next: 'DROPS', prev: 'BLOB'},
  DROPS: {next: null,    prev: 'ATLAS'},
}

const getNextVizType = (vizType) => VIZ_TYPES_CYCLE[vizType].next
const getPrevVizType = (vizType) => VIZ_TYPES_CYCLE[vizType].prev

export default function (state = init, action) {
  switch (action.type) {
    case 'CHANGE_VISUALIZATION':
      return {...state, visualizationType: action.visualizationType}
    case 'NEXT_VISUALIZATION':
      const nextVizType = getNextVizType(state.visualizationType)
      if (nextVizType === null) return state
      return {...state, visualizationType: nextVizType}
    case 'PREV_VISUALIZATION':
      const prevVizType = getPrevVizType(state.visualizationType)
      if (prevVizType === null) return state
      return {...state, visualizationType: prevVizType}
    case 'TOGGLE_TUTORIAL':
      return {...state, tutorial: !state.tutorial}
  }
  return state
}

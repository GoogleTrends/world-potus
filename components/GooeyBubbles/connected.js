import { connect } from 'react-redux'
import { geographicDataSelector } from 'App/selectors'

import GooeyBubbles from './pure'

let mapStateToProps = (state) => (
  {
    geographicData: geographicDataSelector(state),
    expanded: state.gooeyBubbles.expanded,
    usDataEnabled: state.gooeyBubbles.usDataEnabled,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onExpandBubbles: () => dispatch({type: 'TOGGLE_GEOVIZ'}),
    onNextTopic: () => dispatch({type: 'INCREMENT_TOPIC'}),
    onPrevTopic: () => dispatch({type: 'DECREMENT_TOPIC'}),
    onPrevVisualization: () => dispatch({type: 'PREV_VISUALIZATION'}),
    onNextVisualization: () => dispatch({type: 'NEXT_VISUALIZATION'}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(GooeyBubbles)

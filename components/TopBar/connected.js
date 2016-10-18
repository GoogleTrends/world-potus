import { connect } from 'react-redux'
import { selectedTopicSelector } from 'App/selectors'
import TopBar from './pure'

let mapStateToProps = (state) => (
  {
    desktop: state.resize.desktop,
    selectedTopic: selectedTopicSelector(state),
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onNextTopic: () => dispatch({type: 'INCREMENT_TOPIC'}),
    onPrevTopic: () => dispatch({type: 'DECREMENT_TOPIC'}),
    onPrevVisualization: () => dispatch({type: 'PREV_VISUALIZATION'}),
    onNextVisualization: () => dispatch({type: 'NEXT_VISUALIZATION'}),
    onExpandBubbles: () => dispatch({type: 'TOGGLE_GEOVIZ'}),
    onSelectCandidate: candidate => { dispatch({type: 'CHANGE_CANDIDATE', candidate}) },
    onToggleUsData: (usDataEnabled) => dispatch({type: 'TOGGLE_US_DATA', usDataEnabled: usDataEnabled}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)

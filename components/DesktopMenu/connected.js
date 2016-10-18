import { connect } from 'react-redux'
import DesktopMenu from './pure'
import { topicsListSelector, selectedTopicSelector } from 'App/selectors'

const mapStateToProps = (state) => (
  {
    candidate: state.quotes.candidate,
    topicsList: topicsListSelector(state),
    selectedTopic: selectedTopicSelector(state),
    dataDate: state.gooeyBubbles.geographicData.date || '',
    countryCode: state.country || '',
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    onChangeTopic: topicSlug => dispatch({type: 'CHANGE_TOPIC', topicSlug}),
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
    onToggleTutorial: (tutorial) => dispatch({type: 'TOGGLE_TUTORIAL', tutorial}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(DesktopMenu)

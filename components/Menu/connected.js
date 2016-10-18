import { connect } from 'react-redux'
import Menu from './pure'
import { topicsListSelector, selectedTopicSelector } from 'App/selectors'

let mapStateToProps = (state) => (
  {
    menuOpen: state.topBar.menuOpen,
    expanded: state.gooeyBubbles.expanded,
    topicsList: topicsListSelector(state),
    selectedTopic: selectedTopicSelector(state),
    candidate: state.quotes.candidate,
    usDataEnabled: state.gooeyBubbles.usDataEnabled,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleMenu: () => dispatch({type: 'TOGGLE_MENU'}),
    onChangeTopic: topicSlug => dispatch({type: 'CHANGE_TOPIC', topicSlug}),
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
    onToggleTutorial: (tutorial) => dispatch({type: 'TOGGLE_TUTORIAL', tutorial}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

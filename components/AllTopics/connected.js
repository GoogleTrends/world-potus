import { connect } from 'react-redux'
import { topicsListSelector } from 'App/selectors'
import AllTopics from './pure'

let mapStateToProps = (state) => (
  {
    topicsList: topicsListSelector(state),
    menuOpen: state.topBar.menuOpen,
    desktop: state.resize.desktop,
    infoViewOpen: state.bottomBar.infoViewOpen,
    visualizationType: state.view.visualizationType,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleMenu: () => dispatch({type: 'TOGGLE_MENU'}),
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AllTopics)

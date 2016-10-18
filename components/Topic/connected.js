import { connect } from 'react-redux'
import Topic from './pure'
import { geographicDataSelectorByTopicId } from 'App/selectors'

let mapStateToProps = (state, ownProps) => (
  {
    menuOpen: state.topBar.menuOpen,
    desktop: state.resize.desktop,
    geographicData: geographicDataSelectorByTopicId(state, ownProps.id),
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleMenu: () => dispatch({type: 'TOGGLE_MENU'}),
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
    onChangeTopic: topicId => dispatch({type: 'CHANGE_TOPIC', topicId}),
    onChangeVisualization: ({visualizationType}) => dispatch({type: 'CHANGE_VISUALIZATION', visualizationType}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Topic)

import { connect } from 'react-redux'

import TopicList from './pure'

let mapStateToProps = (state) => (
  {
    desktop: state.resize.desktop,
    visualizationType: state.view.visualizationType,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleMenu: () => dispatch({type: 'TOGGLE_MENU'}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(TopicList)

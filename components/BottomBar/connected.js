import { connect } from 'react-redux'

import BottomBar from './pure'

let mapStateToProps = (state) => (
  {
    desktop: state.resize.desktop,
    entityName: state.menu.entityName,
    usDataEnabled: state.gooeyBubbles.usDataEnabled,
    expandedQuotes: state.quotes.expandedQuotes,
    candidate: state.quotes.candidate,
    visualizationType: state.view.visualizationType,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleMenu: () => dispatch({type: 'TOGGLE_MENU'}),
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
    onToggleUsData: () => dispatch({type: 'TOGGLE_US_DATA'}),
    onChangeVisualization: (visualizationType) => dispatch({type: 'CHANGE_VISUALIZATION', visualizationType}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)

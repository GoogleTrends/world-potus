import { connect } from 'react-redux'
import View from './pure'

let mapStateToProps = (state) => (
  {
    infoViewOpen: state.bottomBar.infoViewOpen,
    visualizationType: state.view.visualizationType,
    expanded: state.gooeyBubbles.expanded,
    dataDate: state.gooeyBubbles.geographicData.date || '',
    desktop: state.resize.desktop,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(View)

import { connect } from 'react-redux'
import { selectedTopicSelector } from 'App/selectors'
import View from './pure'

let mapStateToProps = (state) => (
  {
    showLanding: !state.landing.init,
    menuOpen: state.topBar.menuOpen,
    infoViewOpen: state.bottomBar.infoViewOpen,
    selectedTopic: selectedTopicSelector(state),
    visualizationType: state.view.visualizationType,
    candidate: state.quotes.candidate,
    expanded: state.gooeyBubbles.expanded,
    dataDate: state.gooeyBubbles.geographicData.date,
    desktop: state.resize.desktop,
    expandedQuotes: state.quotes.expandedQuotes,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleMenu: () => dispatch({type: 'TOGGLE_MENU'}),
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
    onChangeVisualization: (visualizationType) => dispatch({type: 'CHANGE_VISUALIZATION', visualizationType}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(View)

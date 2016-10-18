import { connect } from 'react-redux'
import Tutorial from './pure'

let mapStateToProps = (state) => (
  {
    tutorial: state.view.tutorial,
    desktop: state.resize.desktop,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleTutorial: (tutorial) => dispatch({type: 'TOGGLE_TUTORIAL', tutorial}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)

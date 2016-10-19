import { connect } from 'react-redux'
import Tutorial from './pure'

let mapStateToProps = (state) => (
  {
    tutorial: state.view.tutorial,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleTutorial: (tutorial) => dispatch({type: 'TOGGLE_TUTORIAL', tutorial}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)

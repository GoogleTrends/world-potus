import { connect } from 'react-redux'
import Quotes from './pure'

let mapStateToProps = (state) => (
  {
    candidate: state.quotes.candidate,
    desktop: state.resize.desktop,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onChangeCandidate: candidate => dispatch({type: 'CHANGE_CANDIDATE', candidate}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Quotes)

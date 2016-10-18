import { connect } from 'react-redux'

import LandingDesktop from './pure'

let mapStateToProps = (state) => (
  {
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onSelectCandidate: candidate => { dispatch({type: 'CHANGE_CANDIDATE', candidate}) },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LandingDesktop)

import { connect } from 'react-redux'

import LandingDesktop from './pure'

const mapDispatchToProps = (dispatch) => (
  {
    onSelectCandidate: candidate => { dispatch({type: 'CHANGE_CANDIDATE', candidate}) },
  }
)

export default connect(null, mapDispatchToProps)(LandingDesktop)

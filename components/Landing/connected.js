import { connect } from 'react-redux'

import Landing from './pure'

let mapStateToProps = (state) => (
  {
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onSelectCandidate: candidate => { dispatch({type: 'CHANGE_CANDIDATE', candidate}) },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Landing)

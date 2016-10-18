import { connect } from 'react-redux'

import Legend from './pure'

let mapStateToProps = (state) => (
  {
    width: state.resize.width,
    height: state.resize.height,
    desktop: state.resize.desktop,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Legend)

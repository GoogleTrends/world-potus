import { connect } from 'react-redux'

import Country from './pure'

let mapStateToProps = (state) => (
  {
    candidate: state.quotes.candidate,
    desktop: state.resize.desktop,
    infoViewOpen: state.bottomBar.infoViewOpen,
    countryCode: state.country,
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onToggleInfoView: () => dispatch({type: 'TOGGLE_INFO_VIEW'}),
    onBack: () => dispatch({type: 'CHANGE_COUNTRY', countryCode: null}),
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Country)

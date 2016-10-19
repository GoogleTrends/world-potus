import { connect } from 'react-redux'
import Charts from './pure'
import { geographicDataSelector, selectedTopicSelector } from 'App/selectors'

let mapStateToProps = (state) => (
  {
    geographicData: geographicDataSelector(state),
    width: state.resize.width,
    height: state.resize.height,
    expanded: state.gooeyBubbles.expanded,
    selectedTopic: selectedTopicSelector(state),
    candidate: state.quotes.candidate,
    usDataEnabled: state.gooeyBubbles.usDataEnabled,
    country: state.country || '',
  }
)

let mapDispatchToProps = (dispatch) => (
  {
    onCountryClick: (countryCode) => { dispatch({type: 'CHANGE_COUNTRY', countryCode}) },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Charts)

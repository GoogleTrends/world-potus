import { connect } from 'react-redux'
import { topicsListSelector, selectedTopicSelector, countryDataSelector, averageDataSelector } from 'App/selectors'
import CountryGraphs from './pure'

let mapStateToProps = (state, ownProps) => (
  {
    desktop: state.resize.desktop,
    data: state.gooeyBubbles.data,
    topicsList: topicsListSelector(state),
    selectedTopic: selectedTopicSelector(state),
    countryData: countryDataSelector(state, ownProps.countryCode),
    expanded: state.gooeyBubbles.expanded,
    averageData: averageDataSelector(state),
  }
)

let mapDispatchToProps = (dispatch) => (
  {

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(CountryGraphs)

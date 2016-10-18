import { connect } from 'react-redux'
import { selectedTopicSelector } from 'App/selectors'
import Quotes from './pure'

let mapStateToProps = (state) => (
  {
    candidate: state.quotes.candidate,
    selectedTopic: selectedTopicSelector(state),
    expanded: state.gooeyBubbles.expanded,
    usDataEnabled: state.gooeyBubbles.usDataEnabled,
    isDesktop: state.resize.desktop,
    country: state.country,
  }
)

export default connect(mapStateToProps)(Quotes)

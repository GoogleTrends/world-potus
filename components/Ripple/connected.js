import { connect } from 'react-redux'
import RipplePure from './pure'

const mapStateToProps = (state) => (
  {
    candidate: state.quotes.candidate,
    isDesktop: state.resize.desktop,
    expandedQuotes: state.quotes.expandedQuotes,
  }
)

export default connect(mapStateToProps)(RipplePure)

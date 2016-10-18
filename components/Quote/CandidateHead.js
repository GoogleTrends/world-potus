import React from 'react'
import styles from './style.css'

export default class CandidateHead extends React.Component {
  static propTypes = {
    onChangeCandidate: React.PropTypes.func.isRequired,
    candidateCode: React.PropTypes.oneOf(['HC', 'DT']).isRequired,
    selectedCandidate: React.PropTypes.oneOf(['HC', 'DT']).isRequired,
  }

  onChangeCandidate = () => {
    this.props.onChangeCandidate(this.props.candidateCode)
  }

  render() {
    const { candidateCode, selectedCandidate } = this.props
    const isSelected = (candidateCode === selectedCandidate)
    return (
      <div
        id={`candidate-${candidateCode}`}
        className={styles.candidate + ' ' + styles[candidateCode] + ' ' + (isSelected ? styles.selectedCandidate : '')}
        onClick={this.onChangeCandidate}
      />
    )
  }
}

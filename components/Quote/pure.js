import React from 'react'
import ExplainingBaloon from 'ExplainingBaloon'
import CandidateHead from './CandidateHead'
import { joinClasses as jc } from 'utils'
import styles from './style.css'

export default function Quote(props) {
  const { candidate, onChangeCandidate } = props

  return (
    <div className={styles.quoteBlock} >
      <CandidateHead candidateCode='HC' selectedCandidate={candidate} onChangeCandidate={onChangeCandidate} />

      <div className={jc(styles.baloon, styles[candidate])}>
        <div className={styles.quote}>
          <div className={styles.text}>
            <ExplainingBaloon />
          </div>
        </div>
        <div className={styles.baloonArrow}></div>
      </div>

      <CandidateHead candidateCode='DT' selectedCandidate={candidate} onChangeCandidate={onChangeCandidate} />
    </div>
  )
}

Quote.propTypes = {
  candidate: React.PropTypes.oneOf(['HC', 'DT']).isRequired,
  onChangeCandidate: React.PropTypes.func.isRequired,
}

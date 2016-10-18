import React from 'react'
import styles from './style.css'
import { CANDIDATES_COLORS as C } from 'constants'

function getCandidatePosition(domElId) {
  const domEl = document.getElementById(domElId)
  if (!domEl) return null
  const { left, top } = domEl.getBoundingClientRect()
  return { left, top }
}

function getDefaultPosition(domElId, isDesktop) {
  // Coming from landing, give hardcoded default position
  if (domElId === 'candidate-HC') {
    return isDesktop
      ? {left: '0%', top: '50%'}
      : {left: '0%', top: 40}
  }
  if (domElId === 'candidate-DT') {
    return isDesktop
      ? {left: '90%', top: '50%'}
      : {left: 'calc(100% - 70px)', top: 40}
  }
}

export default function Ripple({ children, candidate, isDesktop, expandedQuotes }) {
  const positionHC = getCandidatePosition('candidate-HC') || getDefaultPosition('candidate-HC', isDesktop)
  const positionDT = getCandidatePosition('candidate-DT') || getDefaultPosition('candidate-DT', isDesktop)

  return (
    <div className={styles.background} style={{ background: C[candidate] }}>
      {candidate === 'DT' &&
        <div className={styles.ripple} style={{ background: C.DT, ...positionDT }} />
      }
      {candidate === 'HC' &&
        <div className={styles.ripple} style={{ background: C.HC, ...positionHC }} />
      }

      {expandedQuotes && (candidate !== 'HC' ? (
        <div className={styles.rippleHalfLeft} style={{background: C.HC, ...positionHC}} />
      ) : (
        <div className={styles.rippleHalfRight} style={{background: C.DT, ...positionDT}} />
      ))}

      {children}
    </div>
  )
}

Ripple.propTypes = {
  children: React.PropTypes.node,
  candidate: React.PropTypes.oneOf(['HC', 'DT']), /* isOptional */
  isDesktop: React.PropTypes.bool.isRequired,
  expandedQuotes: React.PropTypes.bool.isRequired,
}

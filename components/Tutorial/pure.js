import React from 'react'
import style from './style.css'
import { isTouch } from 'utils'

const IS_TOUCH = isTouch()

function isLocalStorageNameSupported() {
  try {
    window.localStorage.setItem('test', '1')
    window.localStorage.removeItem('test')
    return true
  } catch (error) {
    return false
  }
}

export default class Tutorial extends React.Component {
  closeTutorial = () => {
    if (isLocalStorageNameSupported()) {
      window.localStorage.setItem(`view_tutorial`, true)
    }
    this.props.onToggleTutorial(true)
  }

  render() {
    const tutorialStyle = this.props.tutorial ? style.tutorial : (style.tutorial + ' ' + style.hide)
    return (
      <div className={tutorialStyle}>
        <div className={style.tutorialCandidate}>
          <div className={style.tutorialCandidateCircleContainer}>
            <div className={style.tutorialCandidateCircle}></div>
            <div className={style.tutorialHorizontalCandidateLineLeft}></div>
          </div>
          <div className={style.tutorialBubblesText}>
            {IS_TOUCH ? 'Tap' : 'Click'} to show search interest in topic + candidate
          </div>
          <div className={style.tutorialCandidateCircleContainer}>
            <div className={style.tutorialCandidateCircle}></div>
            <div className={style.tutorialHorizontalCandidateLineRight}></div>
          </div>
        </div>
        <div className={style.tutorialBlobCircle}>
          <div className={style.tutorialBlobLineContainer}>
            <div className={style.tutorialBlobLineArrowTop}></div>
            <div className={style.tutorialBlobLineTop}></div>
            <div className={style.tutorialBlobLineText}>
              {IS_TOUCH ? 'Swipe' : 'Arrow'} up/down to change topic
            </div>
            <div className={style.tutorialBlobLineBottom}></div>
            <div className={style.tutorialBlobLineArrowBottom}></div>
          </div>
          <div className={style.tutorialBlobCircleContainer}>
            <div className={style.tutorialCircle}>
              <div className={style.tutorialBlobCircleText}>
                {IS_TOUCH ? 'Tap' : 'Click'} to switch continent / country view
              </div>
            </div>
          </div>
        </div>
        <div className={style.tutorialButton} onClick={this.closeTutorial}>
          GOT IT &#10003;
        </div>
        <div className={style.tutorialBottom}>
          <div className={style.tutorialFlagContainer}>
            <div className={style.tutorialFlagText}>
              {IS_TOUCH ? 'Tap' : 'Click'} to show / hide USA
            </div>
            <div className={style.tutorialFlagLine}></div>
            <div className={style.tutorialCandidateCircleBottom} style={{top: '15px', backgroundColor: 'white'}}></div>
            <div className={style.tutorialFlag}>
              USA
            </div>
          </div>
        </div>
      </div>
      )
  }
}

Tutorial.propTypes = {
  tutorial: React.PropTypes.bool,
  onToggleTutorial: React.PropTypes.func,
}

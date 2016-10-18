import React from 'react'
import styles from './style.css'

const tooltips = [
  'TAP ON CANDIDATE TO CHANGE QUOTE',
  'SWIPE UP/DOWN TO CHANGE THE TOPIC',
  'TAP ON THE BLOB TO SEE COUNTRIES DETAILS',
  'TAP ON A TAB OR SWIPE TO CHANGE VIEW',
  'TAP THE BALOON TO SEE ALL QUOTES',
]

export default class HelpToolTip extends React.Component {
  propTypes: {
    choices:  React.PropTypes.array.isRequired,
    chosen:   React.PropTypes.str.isRequired,
    onChoice: React.PropTypes.func.isRequired,
  }

  state = {
    tooltipVisible: false,
    index: (parseInt(window.localStorage.getItem(`last_index`)) + 1) || 0,
    clickable: true,
  }

  componentDidMount() {
    this.restartTimer()
    window.addEventListener('touchstart', this.onTouchStart)
  }

  componentWillUnmount() {
    this.cancelTimer()
    window.removeEventListener('touchstart', this.onTouchStart)
  }

  onTouchStart = () => {
    if (this.state.clickable) {
      if (this.state.index < 5) {
        this.setState({tooltipVisible: false, index: this.state.index + 1})
        this.restartTimer()
      }
    } else {
      this.restartTimer()
    }
  }

  restartTimer = () => {
    if (this._timeoutVal) clearTimeout(this._timeoutVal)
    this.setState({clickable: false})
    this._timeoutVal = setTimeout(() => {
      const index = this.state.index
      if (index < 5 && !window.localStorage.getItem(`tooltip_index_${index}`)) {
        this.setState({tooltipVisible: true, clickable: true})
        window.localStorage.setItem(`tooltip_index_${index}`, true)
        window.localStorage.setItem(`last_index`, index)
      }
    }, 5000)
  }

  cancelTimer = () => {
    clearTimeout(this._timeoutVal)
  }

  render() {
    const index = this.state.index

    return (
      <div className={`${styles.tooltipSwipe} ${styles.tooltipSwipe}-${this.state.index}`}>
        {
          this.state.tooltipVisible
          ? (
            <div className={`${styles.toolTip} ${styles.toolTipVisible}`}>
              {/*
                this.state.index === 1
                ? (
                  <div className={styles.arrowLeft}>
                    <span className={styles.arrowLeftIcon}>&lt;</span><span className={styles.arrowLeftIcon}>&lt;</span><span className={styles.arrowLeftIcon}>&lt;</span>
                  </div>
                )
                : (
                  null
                )
              */}
              <div className={styles.toolTipBlock}>
                {
                  // this.state.index === 1
                  // ? (
                  //   <div className={styles.cssArrrowLeft}></div>
                  // )
                  // :
                  (this.state.index === 1 || this.state.index === 2 || this.state.index === 4)
                  ? (
                    <div className={styles.cssArrrowUp}></div>
                  )
                  : null
                }
                {
                  (this.state.index === 1 || this.state.index === 3)
                  ? (
                    <div className={styles.cssArrrowDown}></div>
                  )
                  : null
                }
                {tooltips[index]}
              </div>
              {/*
                this.state.index === 1
                ? (
                  <div className={styles.arrowRight}>
                    <span className={styles.arrowRightIcon}>&gt;</span><span className={styles.arrowRightIcon}>&gt;</span><span className={styles.arrowRightIcon}>&gt;</span>
                  </div>
                )
                : (
                  null
                )
              */}
            </div>
          ) : null
        }
      </div>
      )
  }
}

import React from 'react'
import style from './style.css'
import ArrowIcon from 'ArrowIcon'
import getText from 'getText'

const KEYCODE_ARROW_UP = 38
const KEYCODE_ARROW_DOWN = 40
const KEYCODE_ARROW_RIGHT = 39
const KEYCODE_ARROW_LEFT = 37
const KEYCODE_W = 87
const KEYCODE_A = 65
const KEYCODE_S = 83
const KEYCODE_D = 68
const KEYCODE_SPACEBAR = 32
const KEYCODE_U = 85
const KEYCODE_T = 84
const KEYCODE_C = 67
const KEYCODE_H = 72

export default class TopBar extends React.Component {
  static propTypes = {
    selectedTopic: React.PropTypes.object.isRequired,
    desktop: React.PropTypes.bool.isRequired,
    bubblesPanEventOffsetY: React.PropTypes.number,
    onNextTopic: React.PropTypes.func.isRequired,
    onPrevTopic: React.PropTypes.func.isRequired,
    onPrevVisualization: React.PropTypes.func.isRequired,
    onNextVisualization: React.PropTypes.func.isRequired,
    onExpandBubbles: React.PropTypes.func.isRequired,
    onSelectCandidate: React.PropTypes.func.isRequired,
    onToggleUsData: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    bubblesPanEventOffsetY: 0,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (event) => {
    event = event || window.event

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

    switch (event.which || event.keyCode) {
      case KEYCODE_ARROW_UP:
      case KEYCODE_W:
        event.preventDefault()
        this.props.onPrevTopic()
        return
      case KEYCODE_ARROW_DOWN:
      case KEYCODE_S:
        event.preventDefault()
        this.props.onNextTopic()
        return
      case KEYCODE_ARROW_RIGHT:
      case KEYCODE_D:
        event.preventDefault()
        this.props.onNextVisualization()
        return
      case KEYCODE_ARROW_LEFT:
      case KEYCODE_A:
        event.preventDefault()
        this.props.onPrevVisualization()
        return
      case KEYCODE_SPACEBAR:
        event.preventDefault()
        this.props.onExpandBubbles()
        return
      case KEYCODE_U:
        event.preventDefault()
        this.props.onToggleUsData()
        return
      case KEYCODE_T:
        event.preventDefault()
        this.props.onSelectCandidate('DT')
        return
      case KEYCODE_C:
      case KEYCODE_H:
        event.preventDefault()
        this.props.onSelectCandidate('HC')
        return
    }
  }

  render() {
    const {
      desktop,
      bubblesPanEventOffsetY,
      selectedTopic,
      onPrevTopic,
      onNextTopic,
    } = this.props

    return (
      <div className={desktop ? style.topBarDesktop : style.topBar}>
        <div className={style.topBarEl}>
          {
            desktop
            ? (
              <div className={style.arrowIcon} style={{justifyContent: 'flex-start'}} onClick={onPrevTopic}>
                <ArrowIcon style={{transform: 'rotate(-180deg)'}} />
              </div>
            ) : null
          }
          <div className={style.entityName}
            style={bubblesPanEventOffsetY ? {
              top: bubblesPanEventOffsetY,
              opacity: 1 - Math.abs(bubblesPanEventOffsetY) / 120,
            } : null}
          >
            {getText(`topic_slug_${selectedTopic.slug}`)}
          </div>
          {
            desktop
            ? (
              <div className={style.arrowIcon} style={{justifyContent: 'flex-end'}} onClick={onNextTopic}>
                <ArrowIcon style={{transform: 'rotate(0deg)'}} />
              </div>
            ) : null
          }
        </div>
      </div>
   )
  }
}

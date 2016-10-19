import React from 'react'
import styles from './style.css'
import Legend from 'Legend'
import TopBar from 'TopBar'
import Menu from 'Menu'
import Quotes from 'Quotes'
import GooeyBubbles from 'GooeyBubbles'
import BottomBar from 'BottomBar'
import InfoView from 'InfoView'
import Tutorial from 'Tutorial'
import Sidebar from 'Sidebar'
import DesktopMenu from 'DesktopMenu'
import Charts from 'Charts'
import { isTouch } from 'utils'
import strictProps from 'strictProps'

const IS_TOUCH = isTouch()

export default class View extends React.Component {
  state = {
    bubblesPanEventOffset: {
      x: 0,
      y: 0,
    },
  }

  handleBubblesPanEvent = (offset) => {
    this.setState({bubblesPanEventOffset: offset})
  }

  render() {
    const {
      dataDate,
      desktop,
      expanded,
      infoViewOpen,
      onToggleInfoView,
      visualizationType,
    } = this.props
    const bubblesPanEventOffset = this.state.bubblesPanEventOffset
    const mobi = !desktop

    return (
      <div className={styles.view}>
        {desktop &&
          <Sidebar>
            <DesktopMenu/>
          </Sidebar>
        }
        <div className={styles.main + ' ' + (infoViewOpen ? styles.blur : '')}>
          {mobi &&
            <Menu/>
          }
          {desktop &&
            <TopBar bubblesPanEventOffsetY={bubblesPanEventOffset.y}/>
          }
          <Quotes />
          <GooeyBubbles
            expanded={this.state.quotesCollapsed}
            setBubblesPanEvent={this.handleBubblesPanEvent}
            visualizationType={visualizationType}
          >
            <Legend visualizationType={visualizationType} />
          </GooeyBubbles>
          {mobi &&
            <TopBar bubblesPanEventOffsetY={bubblesPanEventOffset.y}/>
          }
          <div
            className={desktop ? styles.explainingTextDesktop : styles.explainingText}
            style={{opacity: 1 - Math.abs(bubblesPanEventOffset.y) / 45}}
          >
            {IS_TOUCH ? 'Tap' : 'Click'} anywhere on the bubbles
            <br />
            to switch to {expanded ? 'world region view' : 'country view' }
          </div>
          <BottomBar />
          <Tutorial/>
        </div>
        {desktop &&
          <Sidebar>
            <Charts />
          </Sidebar>
        }
        {infoViewOpen &&
          <InfoView closeFunc={onToggleInfoView} desktop={desktop} dataDate={dataDate}/>
        }
      </div>
    )
  }
}

View.propTypes = strictProps({
  visualizationType: React.PropTypes.string,
  infoViewOpen: React.PropTypes.bool,
  onToggleInfoView: React.PropTypes.func,
  dataDate: React.PropTypes.string,
  desktop: React.PropTypes.bool,
  expanded: React.PropTypes.bool,
})

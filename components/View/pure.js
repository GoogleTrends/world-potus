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
      onChangeVisualization,
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
            collapsed={this.state.quotesExpanded}
            setBubblesPanEvent={this.handleBubblesPanEvent}
            visualizationType={visualizationType}
            onChangeVisualization={onChangeVisualization}
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
            {desktop ? 'Click' : 'Tap'} the bubbles to see the {expanded ? ' continents' : ' countries' }
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

View.propTypes = {
  visualizationType: React.PropTypes.string.isRequired,
  infoViewOpen: React.PropTypes.bool.isRequired,
  onToggleInfoView: React.PropTypes.func.isRequired,
  onChangeVisualization: React.PropTypes.func.isRequired,
  dataDate: React.PropTypes.string,
  desktop: React.PropTypes.bool.isRequired,
  expanded: React.PropTypes.bool.isRequired,
}

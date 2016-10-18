import React from 'react'
import style from './style.css'
import TopicsList from 'TopicsList'
import Sidebar from 'Sidebar'
import InfoView from 'InfoView'
import Quotes from 'Quotes'
import Menu from 'Menu'
import Charts from 'Charts'
import IconMenu from 'IconMenu'
import DesktopMenu from 'DesktopMenu'
import getText from 'getText'

export default class AllTopics extends React.Component {
  toggleMenu = () => {
    this.props.onToggleMenu()
  }

  render() {
    const { desktop, infoViewOpen, onToggleInfoView, topicsList } = this.props
    const viewClasses = style.view

    return (
      <div className={viewClasses} ref={ domEl => { this.containerDomNode = domEl }}>
        {desktop &&
          <Sidebar>
            <DesktopMenu/>
          </Sidebar>
        }
        <div className={infoViewOpen ? style.blur : ''} style={{height: '100%', width: desktop ? '60%' : '100%'}}>
          <div className={desktop ? style.allTopicsTitleDesktop : style.allTopicsTitle}>
            {!desktop &&
              <IconMenu onClick={this.toggleMenu} style={{marginRight: '5px'}}/>
            }
            { getText('topic_slug_all_topics') }
          </div>
          <Quotes />
          {desktop &&
            <Menu/>
          }
          <TopicsList topics={topicsList}/>
        </div>
        {desktop &&
          <Sidebar>
            <Charts/>
          </Sidebar>
        }
        {infoViewOpen &&
          <InfoView closeFunc={onToggleInfoView} />
        }
      </div>
    )
  }
}

AllTopics.propTypes = {
  onToggleMenu: React.PropTypes.func.isRequired,
  onToggleInfoView: React.PropTypes.func.isRequired,
  desktop: React.PropTypes.bool.isRequired,
  infoViewOpen: React.PropTypes.bool.isRequired,
  topicsList: React.PropTypes.array.isRequired,
}

import React from 'react'
import style from './style.css'
import Hammer from 'hammerjs'
import getText from 'getText'
import IconClose from 'IconClose'
import { Scrollbars } from 'react-custom-scrollbars'
import { ShareButtons, generateShareIcon } from 'react-share'
import { joinClasses as jc } from 'utils'

const { FacebookShareButton, TwitterShareButton } = ShareButtons
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')

export default class Menu extends React.Component {
  state = {
    panningOffset: 0,
  }

  componentDidMount() {
    const state = this.state
    const hammer = new Hammer(this.dom.container)

    hammer.on('panleft', (event) => {
      const panning = state.panningOffset
      const delta = event.deltaX
      if (delta < 0) {
        this.setState({panningOffset: panning + delta})
      }
    })

    hammer.on('panright', (event) => {
      const panning = state.panningOffset
      const delta = event.deltaX
      if (delta < 0) {
        this.setState({panningOffset: panning + delta})
      }
    })

    hammer.on('panend', () => {
      const el = window.getComputedStyle(this.dom.container)
      const elWidth = parseFloat(el.width)
      const offset = parseFloat(el.width) + parseFloat(el.left)
      if (offset < elWidth / 2) {
        this.setState({panningOffset: null})
        this.props.onToggleMenu()
      } else {
        this.setState({panningOffset: null})
      }
    })
  }

  dom = {
    container: null,
  }

  handleChangeTopic = (topicSlug) => {
    this.props.onChangeTopic(topicSlug)
    this.props.onToggleMenu()
  }

  toggleMenu = () => {
    this.props.onToggleMenu()
  }

  toggleInfoView = () => {
    this.props.onToggleInfoView()
    this.props.onToggleMenu()
  }

  toggleTutorial = () => {
    this.props.onToggleTutorial(true)
    this.props.onToggleMenu()
  }

  render() {
    const { menuOpen, topicsList, candidate, selectedTopic } = this.props
    const { panningOffset } = this.state
    const styling = style.menu + ' ' + (menuOpen ? style.active : '')

    const candidateName = candidate === 'HC' ? 'Hillary Clinton' : 'Donald Trump'
    const isThereATopic = selectedTopic.slug !== 'candidates'
    const topicName = isThereATopic ? getText(`topic_slug_${selectedTopic.slug}`) : ''
    const sentenceFinale = isThereATopic ? ` and ${topicName}` : ''
    const sentenceTW = `Are people outside the US interested in ${candidateName}${sentenceFinale}?`
    const sentenceFB = `Are people outside the US interested in ${candidateName}${sentenceFinale}?`

    return (
      <div ref={domEl => { this.dom.container = domEl }} className={styling} style={panningOffset ? {transition: 'left 0s', left: panningOffset} : {}}>
        <div className={style.itemsContainer}>
          <div className={style.menuHeader}>
            { getText('menu_topics') }
          </div>
          <div className={jc(style.menuSection, style.topics)}>
            <Scrollbars className={style.gradientScrollbarsBlock} style={{paddingTop: '10px'}}>
              {topicsList.map(topic =>
                <TopicMenuEntry
                  key={topic.slug}
                  topic={topic}
                  classWhenSelected={style[candidate]}
                  onChangeTopic={this.handleChangeTopic}
                />
              )}
            </Scrollbars>
          </div>
          <div className={style.menuSection}>
            <div className={style.menuEl} onClick={this.toggleInfoView} style={{height: '40px', alignItems: 'center'}}>
              { getText('menu_about') }
            </div>
            <div className={style.menuEl} onClick={this.toggleTutorial} style={{height: '40px', alignItems: 'center'}}>
              { getText('menu_help') }
            </div>
            <div className={style.iconsGroup} style={{height: '40px', alignItems: 'center'}}>
              <div className={style.menuEl} style={{paddingLeft: 0, width: '50%'}}>
                SHARE
              </div>
              <div style={{marginRight: '15px'}}>
                <FacebookShareButton url={window.location.href.replace('#', '%23')} title={'World POTUS by Accurat and Google News Lab'} description={sentenceFB}>
                  <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>
              </div>
              <div>
                <TwitterShareButton url={window.location.href.replace('#', '%23')} title={sentenceTW}>
                  <TwitterIcon size={32} round={true} style={{marginRight: '15px'}}/>
                </TwitterShareButton>
              </div>
            </div>
          </div>
          <div className={style.close}>
            <IconClose onClick={this.toggleMenu}/>
          </div>
        </div>
        <div className={style.outsideMenu} onClick={this.toggleMenu}></div>
      </div>
    )
  }
}

Menu.propTypes = {
  onChangeTopic: React.PropTypes.func.isRequired,
  onToggleMenu: React.PropTypes.func.isRequired,
  onToggleInfoView: React.PropTypes.func.isRequired,
  onToggleTutorial: React.PropTypes.func.isRequired,
  menuOpen: React.PropTypes.bool.isRequired,
  topicsList: React.PropTypes.array.isRequired,
  candidate: React.PropTypes.string.isRequired,
  selectedTopic: React.PropTypes.object.isRequired,
}

class TopicMenuEntry extends React.Component {
  static propTypes = {
    topic: React.PropTypes.object.isRequired,
    classWhenSelected: React.PropTypes.string.isRequired,
    onChangeTopic: React.PropTypes.func.isRequired,
  }

  handleChangeTopic = () => {
    this.props.onChangeTopic(this.props.topic.slug)
  }

  render() {
    const { topic, classWhenSelected } = this.props
    const classNames = jc(style.menuEl, topic.isSelected && classWhenSelected)
    return (
      <div key={topic.slug} className={classNames} onClick={this.handleChangeTopic}>
        {getText(`topic_slug_${topic.slug}`)}
      </div>
    )
  }
}

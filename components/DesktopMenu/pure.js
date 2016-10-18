import React from 'react'
import style from './style.css'
import getText from 'getText'
import GradientScrollbars from 'GradientScrollbars'
import { timeFormat } from 'd3'
import { ShareButtons, generateShareIcon } from 'react-share'
import { joinClasses as jc, noExtraProps } from 'utils'

const { FacebookShareButton, TwitterShareButton } = ShareButtons
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')

export default class DesktopMenu extends React.Component {
  static propTypes = {
    _noExtraProps_: noExtraProps, // eslint-disable-line react/no-unused-prop-types
    onChangeTopic: React.PropTypes.func.isRequired,
    candidate: React.PropTypes.string.isRequired,
    topicsList: React.PropTypes.array.isRequired,
    selectedTopic: React.PropTypes.object.isRequired,
    onToggleInfoView: React.PropTypes.func.isRequired,
    onToggleTutorial: React.PropTypes.func.isRequired,
    dataDate: React.PropTypes.string.isRequired,
    countryCode: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    dataDate: null,
  }

  toggleInfoView = () => {
    this.props.onToggleInfoView()
  }

  toggleTutorial = () => {
    this.props.onToggleTutorial(true)
  }

  render() {
    const { candidate, topicsList, selectedTopic, onChangeTopic, dataDate, countryCode } = this.props

    const candidateName = candidate === 'HC' ? 'Hillary Clinton' : 'Donald Trump'
    const isThereATopic = selectedTopic.slug !== 'candidates'
    const topicName = isThereATopic ? getText(`topic_slug_${selectedTopic.slug}`) : ''
    const sentenceFinale = isThereATopic ? ` and ${topicName}` : ''
    const sentenceTW = `Are people outside the US interested in ${candidateName}${sentenceFinale}?`
    const sentenceFB = `Are people outside the US interested in ${candidateName}${sentenceFinale}?`
    const dateFormatted = dataDate ? timeFormat("%d %B %Y")(new Date(dataDate)) : null
    const customStyle = { alignItems: 'flex-start' }

    return (
      <div className={jc(style.menu, style.active)}>
        <div className={style.topicsInfo}>
          <div className={style.logoContainer}>
            <a href='/'>
              <div className={style.worldPotus}/>
            </a>
          </div>
          <div className={style.menuHeader} style={{paddingBottom: '10px'}}>
            { getText('menu_topics') }
            <div className={style.menuDate}>
              Showing data for
            </div>
            <div className={style.menuDate}>
              {dateFormatted}
            </div>
          </div>
        </div>
        <div className={style.topicsList}>
          <div className={style.scrollableSection}>
            <GradientScrollbars customStyle={customStyle} autoHeightMax={parseInt(window.innerHeight - 318)} wrap={true} >
              {topicsList.map(topic =>
                <TopicMenuEntry
                  key={topic.slug}
                  topic={topic}
                  classWhenSelected={style[candidate]}
                  onChangeTopic={onChangeTopic}
                />
              )}
            </GradientScrollbars>
          </div>
          <div className={style.legendLink}>
            <div className={style.menuHeader} onClick={this.toggleInfoView} style={{height: '50px', justifyContent: 'center'}}>
              ABOUT
            </div>
            <div className={style.menuHeader} onClick={this.toggleTutorial} style={{height: '50px', justifyContent: 'center'}}>
              HELP
            </div>
            {
              !countryCode && (
                <div className={style.menuShare} style={{height: '50px', alignItems: 'center'}}>
                  SHARE
                  <div style={{margin: '0 15px'}}>
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
              )
            }
          </div>
        </div>
      </div>
    )
  }
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

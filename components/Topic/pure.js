import React from 'react'
import style from './style.css'
import GooeyBubblesPure from 'GooeyBubbles/pure'
import getText from 'getText'

export default class Topic extends React.Component {
  static propTypes = {
    topic: React.PropTypes.object.isRequired,
    desktop: React.PropTypes.bool,
    onChangeTopic: React.PropTypes.func,
    id: React.PropTypes.number,
    geographicData: React.PropTypes.array,
  }

  handleChangeTopic = () => {
    this.props.onChangeTopic(this.props.id)
  }

  render() {
    const { topic, desktop, geographicData, onChangeTopic } = this.props
    return (
      <div className={style.topic + ' ' + (desktop ? style.desktop : '')}>
        <div onClick={this.handleChangeTopic}>
          <GooeyBubblesPure
            geographicData={geographicData}
            setEntity={onChangeTopic}
            visualizationType={'BLOB'}
            resized>
          </GooeyBubblesPure>
          <div className={style.topicTitle}>
            { getText(`topic_slug_${topic.slug}`) }
          </div>
        </div>
      </div>
    )
  }
}

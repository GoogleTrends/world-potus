import React from 'react'
import Topic from 'Topic'
import style from './style.css'
import Hammer from 'hammerjs'
import GradientScrollbars from 'GradientScrollbars'

export default class TopicList extends React.Component {
  static propTypes = {
    topics: React.PropTypes.array.isRequired,
    desktop: React.PropTypes.bool,
  }

  state = {
    pageIndex: 0,
  }

  componentDidMount() {
    const hammer = new Hammer(this.dom.container)
    hammer.set({ enable: !this.props.desktop })
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

    hammer.on('swiperight', (ev) => {
      const newIndex = (this.state.pageIndex < 1) ? 0 : (this.state.pageIndex - 1)
      this.setState({pageIndex: newIndex})
    })

    hammer.on('swipeleft', (ev) => {
      const newIndex = (this.state.pageIndex < 2) ? (this.state.pageIndex + 1) : 2
      this.setState({pageIndex: newIndex})
    })
  }

  dom = {
    container: null,
  }

  render() {
    const {topics, desktop} = this.props
    const width = window.innerWidth
    const columns = (
      <div ref={domEl => { this.dom.container = domEl }} style={{display: desktop ? 'flex' : 'block'}}>
        <div className={desktop ? style.topicsListColumn : style.topicsListColumnMobile} style={{left: desktop ? 0 : -(width * this.state.pageIndex)}}>
          {
          topics.map((topic, index) => {
            if (index < 6) {
              return <Topic key={topic.slug} id={index} topic={topic} desktop={desktop}/>
            }
          })
        }
        </div>
        <div className={desktop ? style.topicsListColumn : style.topicsListColumnMobile} style={{left: desktop ? 0 : -(width * this.state.pageIndex) + (width)}}>
          {
          topics.map((topic, index) => {
            if (index >= 6 && index < 12) {
              return <Topic key={topic.slug} id={index} topic={topic} desktop={desktop}/>
            }
          })
        }
        </div>
        <div className={desktop ? style.topicsListColumn : style.topicsListColumnMobile} style={{left: desktop ? 0 : -(width * this.state.pageIndex) + (2 * width)}}>
          {
          topics.map((topic, index) => {
            if (index >= 12) {
              return <Topic key={topic.slug} id={index} topic={topic} desktop={desktop}/>
            }
          })
        }
        </div>
      </div>
    )

    return (
      <div className={style.topicsList}>
        {
          desktop
          ? (
            <GradientScrollbars>
              {columns}
            </GradientScrollbars>
          ) : (
            columns
          )
        }
        {
          !desktop
          ? (
            <div className={style.mobileNavigation}>
              <div className={style.dot} style={{backgroundColor: this.state.pageIndex === 0 ? 'white' : ''}}></div>
              <div className={style.dot} style={{backgroundColor: this.state.pageIndex === 1 ? 'white' : ''}}></div>
              <div className={style.dot} style={{backgroundColor: this.state.pageIndex === 2 ? 'white' : ''}}></div>
            </div>
          ) : null
        }
      </div>
    )
  }
}

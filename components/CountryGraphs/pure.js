import React from 'react'
import style from './style.css'
import CircleChart from 'CircleChart'
import getText from 'getText'
import NationLegend from 'NationLegend'

function move(from, to) {
  const arr = this.slice()
  arr.splice(to, 0, arr.splice(from, 1)[0])
  return arr
}

export default class CountryGraphs extends React.Component {
  static propTypes = {
    selectedTopic: React.PropTypes.object,
    countryCode: React.PropTypes.string,
    topicsList: React.PropTypes.array,
    countryData: React.PropTypes.array,
    averageData: React.PropTypes.object,
  }

  render() {
    const {selectedTopic, countryCode, countryData, topicsList, averageData} = this.props
    const countryDataBySlug = new Map(countryData.map(topic => ([topic.slug, topic])))
    const selectedTopicPosition = topicsList.findIndex((topic) => topic.slug === selectedTopic.slug)
    const topicsListSorted = selectedTopicPosition >= 0 ? topicsList::move(selectedTopicPosition, 0) : []
    const isUs = (countryCode === 'US')
    return (
      <div className={style.countryGraphs}>
        {
          topicsListSorted.map(topic => {
            const isSelected = topic.isSelected

            // Firefox FIX:
            // It appears FF caches the SVG graphics and has a bug with percentual units,
            // when the box is moved and resized, the dimensions of internal objects are kept the same.
            // Solution: add something to the React `key` to prevent DOM recycling,
            // only for the "big" SVG version.
            const key = `${topic.slug}-${isSelected}`

            return (
              <div key={key} className={isSelected ? style.countryMainGraphs : style.countrySmallGraph}>
                <div className={style.countryGraphsTitle}>
                  { getText(`topic_slug_${topic.slug}`) }
                </div>
                <CircleChart
                  mainGraph={isSelected}
                  topicSlug={topic.slug}
                  circleData={countryDataBySlug.get(topic.slug)}
                  avgData={averageData[topic.slug]}
                  isUS={isUs}
                />
                {
                  isSelected
                  ? (
                    <div style={{float: 'left', marginLeft: '25px'}}>
                      <NationLegend isUs={isUs}/>
                    </div>
                  ) : (
                    <div></div>
                  )
                }
              </div>
            )
          }
        )}
        <br className={style.clearfix} />
      </div>
    )
  }
}

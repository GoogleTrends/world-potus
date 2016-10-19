import React from 'react'
import style from './style.css'
import * as d3 from 'd3'

export default class CircleChart extends React.Component {
  static propTypes = {
    mainGraph: React.PropTypes.bool,
    circleData: React.PropTypes.object.isRequired,
    isUS: React.PropTypes.bool.isRequired,
    avgData: React.PropTypes.number.isRequired,
  }

  static defaultProps = {
    mainGraph: false,
  }

  render() {
    const {mainGraph, circleData, isUS, avgData} = this.props

    if (!circleData || circleData.length === 0) return (<svg></svg>)
    const maxValue = 32
    const linearScale = d3.scaleLinear().domain([0, 100]).range([0, maxValue])
    const percentageScale = val => linearScale(val).toString() + '%'
    const countryValue = circleData.countryData ? circleData.countryData.value : 0
    const usaValue = circleData.usaData ? circleData.usaData.value : 0
    const worldAverage = avgData

    return (
      <svg width="100%" height="100%" className={style.circleChart}>
        <defs>
          <radialGradient id={'grad1'} cx={'50%'} cy={'50%'} r={'50%'} fx={'50%'} fy={'50%'}>
            <stop offset={'0%'} style={{stopColor: isUS ? '#57FB87' : '#FEE94E', stopOpacity: 1}} />
            <stop offset={'100%'} style={{stopColor: isUS ? '#a6f98b' : '#ddeb3b', stopOpacity: 1}} />
          </radialGradient>
        </defs>
        <g>
          <circle cx="50%" cy="50%" r={percentageScale(countryValue)} className={style.circleCountry} fill={'url(#grad1)'} />
          <circle cx="50%" cy="50%" r={percentageScale(usaValue)} className={style.circleLimit} />
          <circle cx="50%" cy="50%" r={mainGraph ? percentageScale(worldAverage) : 0} className={style.circleAverage} />
          <line x1="48%" x2="52%" y1="48%" y2="52%" className={style.circleCenter}/>
          <line x1="48%" x2="52%" y1="52%" y2="48%" className={style.circleCenter}/>
          {
            mainGraph
            ? (
              <g>
                <text x="10%" y="90%" style={{textAnchor: 'start'}} className={style.circleTextState}>{countryValue}</text>
                <text x="50%" y="90%" style={{textAnchor: 'center'}} className={style.circleTextAvg}>{worldAverage}</text>
                <text x="90%" y="90%" style={{textAnchor: 'end'}} className={style.circleTextUSA}>{usaValue}</text>
              </g>
            )
            : (
              <g>
                <text x="10%" y="90%" style={{textAnchor: 'start'}} className={style.circleTextState}>{countryValue}</text>
                <text x="92%" y="90%" style={{textAnchor: 'end'}} className={style.circleTextUSA}>{usaValue}</text>
              </g>
            )
          }
        </g>
      </svg>
    )
  }
}

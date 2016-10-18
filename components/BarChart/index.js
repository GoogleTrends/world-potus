import React from 'react'
import style from './style.css'
import * as d3 from 'd3'
import { BUBBLES_COLORS } from 'constants'
import IconPlus from 'IconPlus'
import COUNTRIES from '../../countries.json'

const BAR_CHART_DOTTED_LINE = (
  <div className={style.barChartLine}>
    {
      Array.from(new Array(11), (x, i) => (
        <div key={i} className={style.barChartDot}></div>
      ))
    }
  </div>
)

export default class BarChart extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    geoDatum: React.PropTypes.object.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    candidate: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,
  }

  onClick = () => {
    this.props.onClick(this.props.geoDatum.geoCode)
  }

  render() {
    const { width, geoDatum, expanded, candidate, selected } = this.props
    const linearScale = d3.scaleLinear().domain([0, 100]).range([6, width - 74])
    const fill = expanded ? BUBBLES_COLORS.COUNTRIES[geoDatum.continentGeoCode] : BUBBLES_COLORS.CONTINENTS[geoDatum.geoCode]
    const needsBorderColor = expanded ? geoDatum.continentGeoCode === 'OCE' : geoDatum.geoCode === 'OCE'
    const backgroundRectStyle = expanded ? (candidate === 'HC' ? style.hoverable + ' ' + style.backgroundHC : style.hoverable + ' ' + style.backgroundDT) : style.hoverable
    const continetsName = {
      'ASIA': 'Asia',
      'OCE': 'Oceania',
      'EUR': 'Europe',
      'AME': 'America',
      'USA': 'United States',
      'AFR': 'Africa',
    }
    const extendedName = !expanded ? continetsName[geoDatum.geoCode] : COUNTRIES[geoDatum.geoCode].name

    const node = (
      <div className={backgroundRectStyle} style={{backgroundColor: selected ? (candidate === 'HC' ? '#488DFB' : '#FC5457') : ''}} onClick={expanded ? this.onClick : null}>

        <div className={style.barChartTextLabel} style={{color: selected ? '#FFFFFF' : ''}}>
          {extendedName}
        </div>
        {
          expanded && (
            <div className={style.barChartIcon}>
              <IconPlus />
            </div>
          )
        }
        <div className={style.barChartText} style={{color: selected ? '#FFFFFF' : ''}}>
          {geoDatum.value}
        </div>
        {BAR_CHART_DOTTED_LINE}
        <div className={style.barChart} style={{width: linearScale(geoDatum.value), backgroundColor: fill, border: needsBorderColor ? '1px solid #ccc' : null}}></div>
      </div>
    )

    return node
  }
}

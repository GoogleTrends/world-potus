import React from 'react'
import * as d3 from 'd3'
import style from './style.css'
import Axis from 'Axis'
import Graticule from 'Graticule'

export default class Legend extends React.Component {
  static propTypes = {
    height: React.PropTypes.number.isRequired,
    visualizationType: React.PropTypes.string.isRequired,
    margin: React.PropTypes.number.isRequired,
    labels: React.PropTypes.array.isRequired,
    desktop: React.PropTypes.bool.isRequired,
  }

  static defaultProps = {
    width:  window.innerWidth,
    height:  window.innerHeight - 280,
    lines: [0, 1, 2],
    margin: 25,
    labels: ['Falling', 'Search interest', 'in the last 24h', 'Rising'],
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    const props = this.props
    const width = this.getWidth()
    const visualizationType = props.visualizationType

    if (visualizationType !== 'BLOB') {
      this.svg
        .attr('width', width)
    }
  }

  getWidth() {
    const props = this.props
    return props.desktop ? props.width * 0.6 : props.width
  }

  getHeight() {
    const props = this.props
    return props.desktop ? props.height - 228 : props.height - 215
  }

  calculatePoints(i) {
    const width = this.getWidth()
    const x1 = this.props.margin
    const x2 = width - this.props.margin
    let y1
    let y2
    if (i === 0) {
      y1 = 0
      y2 = 0
    } else if (i === 1) {
      y1 = this.props.height / 2
      y2 = this.props.height / 2
    } else if (i === 2) {
      y1 = this.props.height
      y2 = this.props.height
    }
    return { x1, x2, y1, y2 }
  }

  render() {
    const width = this.getWidth()
    const height = this.getHeight()
    const { margin, labels, desktop, visualizationType } = this.props
    const dimensions = { width, height, margin }

    return (
      <div className={style.legend}>
        <div className={style.svgContainer + ' ' + (visualizationType === 'BLOB' ? style.blob : '')}>
          {
            !desktop && (
              <svg ref={(svg) => { this.svg = d3.select(svg) }} className={style.svgSwipe} width="30px" height="200px">
                <g>
                  <text dx="-170" dy="20" transform="rotate(-90)" style={{fontSize: '10px'}}>
                    {'< Swipe to change topic >'}
                  </text>
                </g>
              </svg>
            )
          }
          {
            (visualizationType === 'BLOB')
            ? (
              <div></div>
            )
            : (visualizationType === 'DROPS')
            ? (
              <svg ref={(svg) => { this.svg = d3.select(svg) }} className={style.svgGraticule}>
                <g>
                  <line className={style.line} x1={this.calculatePoints(0).x1} x2={this.calculatePoints(0).x2} y1="1%" y2="1%"></line>
                  <line className={style.line} x1={this.calculatePoints(1).x1} x2={this.calculatePoints(1).x2} y1="50%" y2="50%"></line>
                  <line className={style.line} x1={this.calculatePoints(2).x1} x2={this.calculatePoints(2).x2} y1="99%" y2="99%"></line>
                </g>
                <Axis {...dimensions} labels={labels}/>
              </svg>
            ) : (
              <svg ref={(svg) => { this.svg = d3.select(svg) }} className={style.svgGraticule} viewBox="300 0 300 381" width="100%">
                <Graticule {...dimensions} desktop={desktop}/>
              </svg>
            )
          }
        </div>
      </div>
    )
  }
}

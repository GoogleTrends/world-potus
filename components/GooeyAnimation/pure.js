import React from 'react'
import style from './style.css'

export default class GooeyAnimation extends React.Component {
  state = {
    animate: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({animate: true})
    }, 100)
  }

  render() {
    const svgStyle = this.state.animate ? (style.svgLoader + ' ' + style.animate) : style.svgLoader

    return (
      <svg className={svgStyle} width="400" height="130">
        <defs>
          <filter id="gooeyCodeFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="13" colorInterpolationFilters="sRGB" result="blur"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 70 -20" result="gooey"></feColorMatrix>
            <feBlend></feBlend></filter>
        </defs>
        <g className={style.nodes} transform="translate(0, -135)">
          <circle className={style.node0} cx="100" cy="200" r="50"></circle>
          <circle className={style.node1} cx="200" cy="200" r="50"></circle>
          <circle className={style.node2} cx="300" cy="200" r="50"></circle>
        </g>
      </svg>
    )
  }
}

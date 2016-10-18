import React from 'react'
import styles from './style.css'

export default class Label extends React.Component {
  static propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    children: React.PropTypes.string,
    anchor: React.PropTypes.string,
  }

  render() {
    const {x, y, children, anchor} = this.props

    return (
      <text className={styles.label} dx={x} dy={y} style={{textAnchor: `${anchor}`}} transform={'rotate(-90)'}>
        {children}
      </text>
    )
  }
}

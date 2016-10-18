import React from 'react'
import styles from './style.css'

export default class Arrow extends React.Component {
  static propTypes = {
    direction: React.PropTypes.string,
  }
  static defaultProps = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  }
  render() {
    return (
      <g>
        <defs>
          <marker id="marker_arrow" markerHeight="10" markerWidth="10" markerUnits="strokeWidth" orient="auto" refX="0" refY="0" viewBox="-5 -5 10 10"><path d="M 0,0 m -5,-5 L 5,0 L -5,5 Z" fill="#fff"></path></marker>
        </defs>
        {
          this.props.direction === 'bottom'
          ? (
            <line className={styles.line} {...this.props} markerEnd="url(#marker_arrow)" style={{'transform': 'rotate(180)'}}></line>
          )
          : (
            <line className={styles.line} {...this.props} markerEnd="url(#marker_arrow)"></line>
          )
        }

      </g>
    )
  }
}

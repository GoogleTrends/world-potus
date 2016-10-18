import React from 'react'
import Label from 'Label'

export default class Axis extends React.Component {
  static propTypes = {
    labels: React.PropTypes.array,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    margin: React.PropTypes.number,
  }

  calculateOffsets(i) {
    let y = this.props.width - this.props.margin + 8
    let x
    if (i === 3) {
      x = -15
    } else if (i === 1 || i === 2) {
      x = -(this.props.height / 2)
      if (i === 1) {
        y = y - 5
      }
      if (i === 2) {
        y = y + 7
      }
    } else {
      x = -(this.props.height) + 25
    }

    let anchor
    if (i === 0) anchor = 'start'
    else if (i === 1) anchor = 'middle'
    else if (i === 2) anchor = 'middle'
    else if (i === 3) anchor = 'end'

    return {x, y, anchor}
  }

  calculateArrowPoints(i) {
    const length = (this.props.height - 240) / 2
    const direction = i === 0 ? 'bottom' : 'top'
    const startingPoint = (this.props.height / 2) + 65
    let y1 = i === 0 ? 50 : startingPoint
    let y2 = i === 0 ? 50 + length : startingPoint + length
    const x1 = this.props.width - this.props.margin - 8
    const x2 = x1
    if (direction === 'bottom') {
      y1 = [y2, y2 = y1][0]
    }
    return {x1, x2, y1, y2, direction}
  }

  render() {
    const {labels} = this.props
    return (
      <g>
        {
          labels.map((label, index) => <Label key={index} {...this.calculateOffsets(index)}>{label}</Label>)
        }
      </g>
    )
  }
}

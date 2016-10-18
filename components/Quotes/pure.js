import React from 'react'
import style from './style.css'
import Quote from 'Quote'

export default class Quotes extends React.Component {
  render() {
    const { onChangeCandidate, candidate, desktop } = this.props

    const containerStyle = desktop ? style.littleDesktop : style.little

    return (
      <div className={containerStyle}>
        <div className={style.quotes}>
          <Quote candidate={candidate} onChangeCandidate={onChangeCandidate} />
        </div>
      </div>
    )
  }
}

Quotes.propTypes = {
  onChangeCandidate: React.PropTypes.func.isRequired,
  candidate: React.PropTypes.oneOf(['HC', 'DT']).isRequired,
  desktop: React.PropTypes.bool.isRequired,
}

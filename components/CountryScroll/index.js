import React from 'react'
import style from './style.css'
import COUNTRIES from '../../countries.json'
import CountryData from 'CountryData'
import CountryGraphs from 'CountryGraphs'
import GradientScrollbars from 'GradientScrollbars'

export default class CountryScroll extends React.Component {
  static propTypes = {
    countryCode: React.PropTypes.string,
    candidate: React.PropTypes.string,
    onBack: React.PropTypes.func,
  }

  render() {
    const { countryCode, candidate, onBack } = this.props
    const countryData = COUNTRIES[this.props.countryCode]

    const customStyle = { flexDirection: 'column', alignItems: 'center' }

    return (
      <div className={style.countryScroll}>
        <div className={style.countrySection}>
          <div className={style.countryDataName} style={{borderBottom: '1px solid rgba(75,75,75,0.2)'}}>
            {countryData.name}
          </div>
          <GradientScrollbars customStyle={customStyle} flex={false}>
            <CountryData countryCode={countryCode} candidate={candidate}/>
            <CountryGraphs countryCode={countryCode}/>
          </GradientScrollbars>
        </div>
        <div className={style.bottom} onClick={onBack} style={{borderTop: '1px solid rgba(75,75,75,0.2)'}}>
          <span className={style.link}>
            {'< BACK TO VIEW'}
          </span>
        </div>
      </div>
    )
  }
}

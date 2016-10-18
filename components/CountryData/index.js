import React from 'react'
import style from './style.css'
import numeral from 'numeral'
import COUNTRIES from '../../countries.json'
import CountryMap from 'CountryMap'

export default class Country extends React.Component {
  static propTypes = {
    countryCode: React.PropTypes.string,
    candidate: React.PropTypes.string,
  }

  render() {
    const countryData = COUNTRIES[this.props.countryCode]

    return (
      <div className={style.countryData}>
        <div className={style.countryDataImage}>
          <CountryMap centerLat={countryData.lat} centerLng={countryData.lng} candidate={this.props.candidate}/>
        </div>
        <div className={style.countryDataText}>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              Language
            </div>
            <div className={style.countryDataValue}>
              {countryData.languages.split(',').slice(0, 2).join(', ')}
            </div>
          </div>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              Capital
            </div>
            <div className={style.countryDataValue}>
              {countryData.capital}
            </div>
          </div>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              Area
            </div>
            <div className={style.countryDataValue}>
              {numeral(countryData.area).format('0,0') + ' km2'}
            </div>
          </div>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              Population
            </div>
            <div className={style.countryDataValue}>
              {numeral(countryData.population).format('0,0')}
            </div>
          </div>
        </div>
        <div className={style.countryDataText}>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              GDP (Purchasing Power Parity)
            </div>
            <div className={style.countryDataValue}>
              {numeral(countryData.GDP_PPP).format('($ 0.00 a)')}
            </div>
          </div>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              GDP (Nominal)
            </div>
            <div className={style.countryDataValue}>
              {numeral(countryData.GDPPerCapita).format('($ 0.00 a)')}
            </div>
          </div>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              Income Distribution
            </div>
            <div className={style.countryDataValue}>
              {countryData.incomeDistribution}
            </div>
          </div>
          <div className={style.countryDataRow}>
            <div className={style.countryDataTitle}>
              Development Index
            </div>
            <div className={style.countryDataValue}>
              {countryData.developmentIndex}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

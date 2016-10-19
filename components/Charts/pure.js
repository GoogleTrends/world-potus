import React from 'react'
import style from './style.css'
import GradientScrollbars from 'GradientScrollbars'
import BarChart from 'BarChart'
import AccuratLogo from 'AccuratLogo'
import GoogleLogo from 'GoogleLogo'
import DesktopLegend from 'DesktopLegend'
import getText from 'getText'
import strictProps from 'strictProps'

export default class Charts extends React.Component {
  static propTypes = strictProps({
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    geographicData: React.PropTypes.array,
    expanded: React.PropTypes.bool,
    candidate: React.PropTypes.string,
    onCountryClick: React.PropTypes.func,
    selectedTopic: React.PropTypes.object,
    usDataEnabled: React.PropTypes.bool,
    country: React.PropTypes.string,
  })

  render() {
    const { width, height, geographicData, expanded, candidate, onCountryClick, selectedTopic, usDataEnabled, country } = this.props
    const topicSlug = selectedTopic.slug
    const customStyle = { alignItems: 'flex-start', height: 'initial', flexDirection: 'column' }
    const geographicDataSorted = geographicData.sort((a, b) => a.value === b.value ? 0 : (a.value < b.value ? 1 : -1))
    return (
      <div className={style.charts}>
        <div className={style.infoContainer}>
          <a href="https://newslab.withgoogle.com/" target="_blank" style={{textDecoration: 'none'}}>
            <div className={style.logo}>
              <span>powered by </span><br/>
              <GoogleLogo style={{width: '90px'}}/>
            </div>
          </a>
          <a href="http://www.accurat.it" target="_blank" style={{textDecoration: 'none'}}>
            <div className={style.logo}>
              <span>designed by </span><br/>
              <AccuratLogo/>
            </div>
          </a>
        </div>
        <div className={style.chartsContainer}>
          <div className={style.chartsTitle} style={{height: '62px', fontSize: '12px'}}>
            TOP {expanded ? 'COUNTRIES' : 'CONTINENTS'} {usDataEnabled ? ' OUTSIDE THE US ' : ''} SEARCHING FOR {' '}
            {getText(`topic_slug_${topicSlug}`)} + {(candidate === 'HC') ? 'Hillary Clinton (Average)' : 'Donald Trump (avg)'}
          </div>
          <div className={style.scrollableSection}>
            <GradientScrollbars flex={true} customStyle={customStyle}>
              {geographicDataSorted && geographicDataSorted.map((countryData, index) =>
                <BarChart
                  key={countryData.geoCode}
                  index={index}
                  width={0.2 * width}
                  height={height}
                  geoDatum={countryData}
                  expanded={expanded}
                  candidate={candidate}
                  onClick={onCountryClick}
                  selected={country === countryData.geoCode}
                  />
                )}
            </GradientScrollbars>
          </div>
        </div>
        <div className={style.legend}>
          <div className={style.chartsTitle}>HOW TO READ IT</div>
          <DesktopLegend expanded/>
        </div>
      </div>
    )
  }
}

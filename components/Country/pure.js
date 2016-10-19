import React from 'react'
import style from './style.css'
import TopBar from 'TopBar'
import Charts from 'Charts'
import Sidebar from 'Sidebar'
import InfoView from 'InfoView'
import CountryScroll from 'CountryScroll'
import DesktopMenu from 'DesktopMenu'
import Quotes from 'Quotes'
import strictProps from 'strictProps'

export default class Country extends React.Component {
  static propTypes = strictProps({
    candidate: React.PropTypes.string,
    desktop: React.PropTypes.bool,
    infoViewOpen: React.PropTypes.bool,
    countryCode: React.PropTypes.string,
    onToggleInfoView: React.PropTypes.func,
    onBack: React.PropTypes.func,
  })

  render() {
    const {
      candidate,
      desktop,
      infoViewOpen,
      onToggleInfoView,
      countryCode,
      onBack,
    } = this.props

    return (
      <div className={style.view}>
        {desktop &&
          <Sidebar>
            <DesktopMenu/>
          </Sidebar>
        }
        <div className={infoViewOpen ? style.blur : style.container} style={{height: '100%', width: desktop ? '60%' : '100%', position: 'relative'}}>
          <TopBar />
          <Quotes />
          <CountryScroll
            countryCode={countryCode}
            candidate={candidate}
            onBack={onBack}
          />
        </div>

        {desktop &&
          <Sidebar>
            <Charts/>
          </Sidebar>
        }
        {infoViewOpen &&
          <InfoView closeFunc={onToggleInfoView} desktop={desktop} />
        }
      </div>
    )
  }
}

import React from 'react'
import style from './style.css'
import Hammer from 'hammerjs'
import IconBlob from 'IconBlob'
import IconAtlas from 'IconAtlas'
import { Scrollbars } from 'react-custom-scrollbars'
import IconRipple from 'IconRipple'
import IconClose from 'IconClose'
import COUNTRIES from '../../countries.json'
import { groupBy, map } from 'lodash'
import { BUBBLES_COLORS } from '../constants'
import ArrowIcon from 'ArrowIcon'
import InfoViewIcon from 'InfoViewIcon'
import { timeFormat } from 'd3'

export default class InfoView extends React.Component {
  static propTypes = {
    closeFunc: React.PropTypes.func,
    desktop: React.PropTypes.bool,
    dataDate: React.PropTypes.string,
  }

  state = {
    pageIndex: 0,
    continentOpen: {
      'ASIA': false,
      'EUR': false,
      'AFR': false,
      'OCE': false,
      'AME': false,
    },
  }

  componentDidMount() {
    const hammer = new Hammer(this.dom.container)
    hammer.set({ enable: !this.props.desktop })
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })

    hammer.on('swiperight', () => {
      const newIndex = (this.state.pageIndex < 1) ? 0 : (this.state.pageIndex - 1)
      this.setState({pageIndex: newIndex})
    })

    hammer.on('swipeleft', () => {
      const newIndex = (this.state.pageIndex < 2) ? (this.state.pageIndex + 1) : 2
      this.setState({pageIndex: newIndex})
    })
  }

  dom = {
    container: null,
  }

  nextTab = () => {
    const newIndex = (this.state.pageIndex < 2) ? (this.state.pageIndex + 1) : 2
    this.setState({pageIndex: newIndex})
  }

  prevTab = () => {
    const newIndex = (this.state.pageIndex < 1) ? 0 : (this.state.pageIndex - 1)
    this.setState({pageIndex: newIndex})
  }

  toggleContinentList(continent) {
    const continentOpenCopy = this.state.continentOpen
    continentOpenCopy[continent] = !continentOpenCopy[continent]
    this.setState({continentOpen: continentOpenCopy})
  }

  render() {
    const { desktop, dataDate } = this.props
    const mobi = !desktop
    const width = window.innerWidth
    const countriesList = groupBy(COUNTRIES, 'continent')
    delete countriesList.USA // ARGHH
    const dateFormatted = dataDate ? timeFormat("%d %B %Y")(new Date(dataDate)) : null

    return (
      <div ref={domEl => { this.dom.container = domEl }} className={desktop ? style.infoViewDesktop : style.infoViewMobile}>
        <div className={desktop ? style.wrapper : style.wrapperMobile}>
          <div className={style.close}>
            <IconClose onClick={this.props.closeFunc} />
          </div>
          <div className={desktop ? style.infoViewColumn : style.infoViewColumnMobile} style={{left: desktop ? 0 : -(width * this.state.pageIndex)}}>
            <Scrollbars>
              <div className={style.infoViewContainer}>
                <div className={style.infoViewTextMobile}>
                  <div className={style.infoViewTitle}>
                    HOW TO READ IT
                  </div>
                  <div className={style.infoViewP}>
                    In all visualizations, each bubble represents a geographic area (World Region or Country) and its size is proportional to its Google Trends index (0-100), which represents the online search interest for the selected candidate and the selected topic.
                    <br /><br />
                    <InfoViewIcon style={{width: '250px', margin: '10px auto', display: 'block'}}/>
                    <br /><br />
                    Clicking on the bubbles switches from world region to a breakdown of the top 12 countries.
                  </div>
                  <div className={style.infoViewBlock}>
                    {
                      map(countriesList, (countries, continentCode) =>
                        // Sooner or later someone will fix this eslint react/jsx-no-bind error...
                        // eslint-disable-next-line react/jsx-no-bind
                        <div key={continentCode} className={style.continentBlock} onClick={() => this.toggleContinentList(continentCode)}>
                          <div className={style.continentBlockName}>
                            <div className={style.continentBlockIcon} style={{ backgroundColor: BUBBLES_COLORS['COUNTRIES'][continentCode] }}></div>{continentCode}
                            <div>
                              <ArrowIcon style={{width: '10px', transform: this.state.continentOpen[continentCode] ? 'rotate(-90deg)' : 'rotate(90deg)', marginLeft: '10px'}}></ArrowIcon>
                            </div>
                          </div>
                          <div className={this.state.continentOpen[continentCode] ? style.continentOpen : style.continentClose}>
                            {
                              countriesList[continentCode].map((country) => {
                                return <div className={style.countryBlock} key={country.isoCodeA2}>{country.name} - {country.isoCodeA2}</div>
                              })
                            }
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </Scrollbars>
          </div>
          <div className={desktop ? style.infoViewColumn : style.infoViewColumnMobile} style={{left: desktop ? 0 : -(width * this.state.pageIndex) + (width), flexDirection: 'column'}}>
            <Scrollbars>
              <div className={style.infoViewContainer} style={{flexShrink: 0, width: '100%', flexDirection: 'column', alignItems: 'flex-start'}}>
                <div style={{marginBottom: '30px', width: '100%'}}>
                  <div className={style.infoViewIconContainer} >
                    <IconBlob style={{width: '45px'}}/>
                  </div>
                  <div className={style.infoViewP} style={{width: 'calc(100% - 60px)'}}>
                    <div className={style.infoViewTitle}>
                      BLOB VIEW
                    </div>
                    <div className={style.infoViewP}>
                    The proximity of the bubbles is based on similarity in search habits across all topics: the closer, the more similar countries are to each other.
                    </div>
                  </div>
                </div>
                <div style={{marginBottom: '30px', width: '100%'}}>
                  <div className={style.infoViewIconContainer}>
                    <IconAtlas style={{width: '45px'}}/>
                  </div>
                  <div className={style.infoViewP} style={{width: 'calc(100% - 60px)'}}>
                    <div className={style.infoViewTitle}>
                      ATLAS VIEW
                    </div>
                    <div className={style.infoViewP}>
                      Countries and world region are organized by geography, divided into 6 areas: USA, Americas, Africa, Asia, Europe and Oceania.
                    </div>
                  </div>
                </div>
                <div style={{marginBottom: '30px', width: '100%'}}>
                  <div className={style.infoViewIconContainer}>
                    <IconRipple style={{width: '45px'}}/>
                  </div>
                  <div className={style.infoViewP} style={{width: 'calc(100% - 60px)'}}>
                    <div className={style.infoViewTitle}>
                      DROPS VIEW
                    </div>
                    <div className={style.infoViewP}>
                      Bubbles are distributed vertically depending on the last 24-hour trend in search interest.
                    </div>
                  </div>
                </div>
              </div>
            </Scrollbars>
          </div>
          <div className={desktop ? style.infoViewColumn : style.infoViewColumnMobile} style={{left: desktop ? 0 : -(width * this.state.pageIndex) + (2 * width)}}>
            <Scrollbars>
              <div className={style.infoViewContainer}>
                <div className={style.infoViewTextMobile}>
                  <div className={style.infoViewTitle}>
                    ABOUT THE PROJECT
                  </div>
                  <div className={style.infoViewP}>
                    <div style={{display: 'block'}}>
                      <a href="http://accurat.it" target="_blank">Accurat</a> and <a href="https://newslab.withgoogle.com/" target="_blank">Google’s News Lab</a> wanted to show how the US election is being searched across the world. By looking at searches for each candidate and how they differ in each country, we can show how variations in search differ — and which region is interested in each of the major election issues. The issues themselves are ranked based on the top issues of the campaign as decided by their place in Google search on average in 2016. The data is scraped once a day from google.com/trends for the duration of the election campaign.
                    </div>
                    <br />
                    <div style={{display: 'block'}}>Accurat: Amin Al Hazwani, Marco Bernardi, Davide Ciuffi, Paolo Corti, Luca Falasco, Pietro Guinea Montalvo, Giorgia Lupi, Simone Quadri, Tommaso Renzini, Gabriele Rossi, Cesare Soldini, Marco Vettorello, Tommaso Zennaro. With: Francesco Costa, Simone Tolomelli.
                    Google: Alberto Cairo, Simon Rogers, Jennifer Lee.</div>
                    <br />
                  </div>
                  <div className={style.infoViewP}>
                    <div className={style.infoViewTitle}>TIME INTERVAL</div>
                    <div>Currently showing searches for {dateFormatted}</div>
                    <br />
                  </div>
                  <div className={style.infoViewP}>
                    <div className={style.infoViewTitle}>
                      METHODOLOGY
                    </div>
                    <div className={style.bolder}>Bubbles’ Size</div>
                    <div >USA & SINGLE COUNTRIES:</div>
                    <div>The size of each country’s bubble is directly proportional to its Google Trend index.</div>
                    <br />
                    <div>WORLD REGIONS:</div>
                    <div style={{display: 'block'}}>Google Trends indexes of each country are weighted by population and percentage of active internet users (Source: <a href="http://data.worldbank.org/" target="_blank">Worldbank</a>) to calculate a value that represents the world region.</div>
                    <br />
                    <div className={style.bolder}>Bubbles’ Distribution (BLOB VIEW)</div>
                    <div style={{display: 'block'}}>In the top 12 countries breakdown, bubbles are positioned according to a force directed layout based on the <a href="https://www.google.com/search?q=pearson%20correlation&rct=j#q=Pearson+correlation" target="_blank">Pearson correlation</a> coefficient between each combination of countries and search interest across all topics. The result of the calculation creates clusters of countries that are considered similar based on the average Google Trends Index relative to all the topics.</div>
                    <br />
                  </div>
                </div>
              </div>
            </Scrollbars>
          </div>
          {mobi &&
            <div className={style.mobileNavigation}>
              <div className={style.mobileNavigationLeft} onClick={this.prevTab}>
                <ArrowIcon style={{width: '20px', transform: 'rotate(-180deg)'}}/>
                <div>PREV</div>
              </div>
              <div>
                <div className={style.dot} style={{backgroundColor: this.state.pageIndex === 0 ? 'white' : ''}}></div>
                <div className={style.dot} style={{backgroundColor: this.state.pageIndex === 1 ? 'white' : ''}}></div>
                <div className={style.dot} style={{backgroundColor: this.state.pageIndex === 2 ? 'white' : ''}}></div>
              </div>
              <div className={style.mobileNavigationRight} onClick={this.nextTab}>
                <div>NEXT</div> <ArrowIcon style={{width: '20px'}} />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

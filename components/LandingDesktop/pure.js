import React from 'react'
import style from './style.css'
import GoogleLogo from 'GoogleLogo'
import AccuratLogo from 'AccuratLogo'
import { joinClasses as jc } from 'utils'

export default class LandingDesktop extends React.Component {
  state = {
    animate: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({animate: true})
    }, 100)
  }

  selectClinton = (event) => {
    const { onSelectCandidate } = this.props
    onSelectCandidate('HC')
  }
  selectTrump = (event) => {
    const { onSelectCandidate } = this.props
    onSelectCandidate('DT')
  }

  render() {
    return (
      <div className={style.landing}>
        <div className={style.container}>
          <div className={this.state.animate ? style.candidateAnimated : style.candidate}>
            <div className={style.circle + ' ' + style.HC} onClick={this.selectClinton}/>
            <div className={jc(style.circleAnimationClinton, style.circleAnimation__1)}/>
            <div className={jc(style.circleAnimationClinton, style.circleAnimation__2)}/>
            <div className={jc(style.circleAnimationClinton, style.circleAnimation__3)}/>
            <div className={jc(style.circleAnimationClinton, style.circleAnimation__4)}/>
          </div>
          <div className={style.selection}>
            <div className={style.selectionText}>
              <div className={style.logo}>
                <AccuratLogo/>
              </div>
                AND
              <div className={style.logo}>
                <GoogleLogo style={{opacity: 0.8, width: '180px'}}/>
              </div>
            </div>
            PRESENT
            <div className={style.descriptionContainer}>
              <div className={style.title}>
                <div className={style.worldPotus}/>
              </div>
              <div className={this.state.animate ? style.descriptionAnimated : style.description}>
              Do you want to know how much people outside the United States are interested in
              the presidential elections? Discover the most searched for topics worldwide.
              </div>
              <a className={this.state.animate ? style.linkAnimated : style.link} href="https://google.com/elections" target="_blank">google.com/elections</a>
            </div>
          </div>
          <div className={this.state.animate ? style.candidateAnimated : style.candidate}>
            <div className={style.circle + ' ' + style.DT} onClick={this.selectTrump}/>
            <div className={jc(style.circleAnimationTrump, style.circleAnimation__1)}/>
            <div className={jc(style.circleAnimationTrump, style.circleAnimation__2)}/>
            <div className={jc(style.circleAnimationTrump, style.circleAnimation__3)}/>
            <div className={jc(style.circleAnimationTrump, style.circleAnimation__4)}/>
          </div>
        </div>

        <div className={this.state.animate ? style.footerAnimate : style.footer}>
          CLICK ON A CANDIDATE TO BEGIN EXPLORING
        </div>
      </div>
    )
  }
}

LandingDesktop.propTypes = {
  onSelectCandidate: React.PropTypes.func.isRequired,
}

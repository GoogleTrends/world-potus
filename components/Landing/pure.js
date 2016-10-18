import React from 'react'
import style from './style.css'
import GoogleLogo from 'GoogleLogo'

export default class Landing extends React.Component {
  state = {
    animate: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({animate: true})
    }, 100)
  }

  selectClinton = () => {
    this.props.onSelectCandidate('HC')
  }

  selectTrump = () => {
    this.props.onSelectCandidate('DT')
  }

  render() {
    const loaderStyle = this.state.animate ? (style.animate + ' ' + style.loader) : style.loader
    return (
      <div className={style.landing}>
        <div className={style.title}>
          <div className={style.worldPotus}/>
        </div>
        <div className={this.state.animate ? style.candidatesAnimated : style.candidates}>
          <div className={style.candidate}>
            <div className={style.circle + ' ' + style.HC} onClick={this.selectClinton}/>
            <div className={style.candidateName}>H. Clinton</div>
          </div>
          <div className={style.candidate}>
            <div className={style.circle + ' ' + style.DT} onClick={this.selectTrump}/>
            <div className={style.candidateName}>D. Trump</div>
          </div>
        </div>

        <div className={this.state.animate ? style.descriptionAnimated : style.description}>
          Do you want to know how much people outside the United States are interested in
          the presidential elections? Discover the most searched for topics worldwide.
        </div>
        <a className={this.state.animate ? style.linkAnimated : style.link} href="https://google.com/elections" target="_blank">google.com/elections</a>
        <div className={style.selection}>
          <div className={this.state.animate ? style.selectionTextAnimated : style.selectionText}>
            TAP ON A CANDIDATE TO BEGIN EXPLORING
          </div>
        </div>
        <div className={loaderStyle} >
        </div>
        <div className={this.state.animate ? style.footerAnimated : style.footer}>
          Designed by Accurat, Powered by
          <div className={style.logo}>
            <GoogleLogo/>
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  onSelectCandidate: React.PropTypes.func.isRequired,
}

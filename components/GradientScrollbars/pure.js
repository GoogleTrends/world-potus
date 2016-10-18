import React from 'react'
import style from './style.css'
import { Scrollbars } from 'react-custom-scrollbars'

const hiddenScrollTracks = () => <span style={{display: 'none'}} />

export default class GradientScrollbars extends React.Component {
  static defaultProps = {
    flex: true,
    wrap: false,
    gradientStyle: {},
    autoHeightMax: 100,
  }

  render() {
    let customStyle = this.props.customStyle
    let autoHeightMin = this.props.autoHeightMax || 0

    // const gradientStyle = this.props.gradientStyle
    if (customStyle) {
      customStyle.transform = 'scale(1)'
    }

    const scrollbarStyle = this.props.wrap
      ? style.gradientScrollbarsWrap
      : (this.props.flex ? style.gradientScrollbars : style.gradientScrollbarsBlock)

    return (
      <Scrollbars className={scrollbarStyle} style={customStyle} autoHeightMin={autoHeightMin} universal renderTrackHorizontal={hiddenScrollTracks}>
        {/*
          !this.props.hideGradient
          ? [<div key="gradient-top" className={style.gradient + ' ' + style.top} style={gradientStyle || null}/>,
          <div key="gradient-bottom" className={style.gradient + ' ' + style.bottom} style={gradientStyle || null}/>]
          : null*/
        }
        {this.props.children}
      </Scrollbars>
    )
  }
}

GradientScrollbars.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  // hideGradient: React.PropTypes.bool,
  customStyle: React.PropTypes.object,
  // gradientStyle: React.PropTypes.object,
  flex: React.PropTypes.bool,
  wrap: React.PropTypes.bool,
  autoHeightMax: React.PropTypes.number,
}

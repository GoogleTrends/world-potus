import React from 'react'
import style from './style.css'
import Button from 'Button'
import IconMenu from 'IconMenu'

export default class BottomBar extends React.Component {
  static propTypes = {
    onChangeVisualization: React.PropTypes.func,
    onToggleUsData: React.PropTypes.func,
    visualizationType: React.PropTypes.string,
    desktop: React.PropTypes.bool,
    usDataEnabled: React.PropTypes.bool,
    expandedQuotes: React.PropTypes.bool,
    onToggleMenu: React.PropTypes.func,
  }

  handleToggleMenu = () => {
    this.props.onToggleMenu()
  }

  handleToggleUsData = () => {
    this.props.onToggleUsData(!this.props.usDataEnabled)
  }

  handleVisualizeBlob = () => {
    this.props.onChangeVisualization('BLOB')
  }

  handleVisualizeAtlas = () => {
    this.props.onChangeVisualization('ATLAS')
  }

  handleVisualizeDrops = () => {
    this.props.onChangeVisualization('DROPS')
  }

  render() {
    const { visualizationType, desktop, usDataEnabled, expandedQuotes } = this.props
    const mobi = !desktop

    return (
      <div className={style.bottomBar} style={{display: expandedQuotes ? 'none' : 'flex'}}>
        <div className={style.bottomBarElStart}>
          {
            mobi &&
            <IconMenu onClick={this.handleToggleMenu} style={{transform: 'scale(1)'}}/>
          }
        </div>
        <div className={style.bottomBarEl}>
          <Button
            active={visualizationType === 'BLOB'}
            onClick={this.handleVisualizeBlob}>
             BLOB
          </Button>
        </div>
        <div className={style.bottomBarEl}>
          <Button
            active={visualizationType === 'ATLAS'}
            onClick={this.handleVisualizeAtlas}>
              ATLAS
          </Button>
        </div>
        <div className={style.bottomBarEl}>
          <Button
            active={visualizationType === 'DROPS'}
            onClick={this.handleVisualizeDrops}>
              DROPS
          </Button>
        </div>
        <div className={style.bottomBarElEnd}>
          <div
            onClick={this.handleToggleUsData}
            className={usDataEnabled ? style.toggleButton : style.toggleButtonDisabled}
            style={{padding: desktop ? '0 10px' : ''}}>
            {mobi ? 'USA' : (usDataEnabled ? 'HIDE USA' : 'SHOW USA')}
          </div>
        </div>
      </div>
    )
  }
}

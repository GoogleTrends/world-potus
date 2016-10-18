import React from 'react'
import style from './style.css'

export default function Button(props) {
  const { active } = props

  const className = active ? style.buttonActive : style.button

  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  )
}

Button.propTypes = {
  active: React.PropTypes.bool,
  onClick:   React.PropTypes.func,
  children:  React.PropTypes.node,
}

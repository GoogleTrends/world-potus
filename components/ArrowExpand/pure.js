import React from 'react'
import style from './style.css'

export default function ArrowExpand(props) {
  return (
    <svg className={style.arrowExpand} viewBox="0 0 9 5.9" onClick={props.onClick} style={props.style ? props.style : null}>
      <polyline points="0,0 4.5,5.9 9,0 "/>
    </svg>
  )
}

ArrowExpand.propTypes = {
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
}

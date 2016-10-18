import React from 'react'
import style from './style.css'

export default function ArrowCollapse(props) {
  return (
    <svg className={style.arrowCollpase} viewBox="0 0 9 5.9" onClick={props.onClick} style={props.style ? props.style : null}>
      <polyline points="0,5.9 4.5,0 9,5.9 "/>
    </svg>
  )
}

ArrowCollapse.propTypes = {
  onClick: React.PropTypes.func,
  style: React.PropTypes.object,
}

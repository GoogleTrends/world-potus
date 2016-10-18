import React from 'react'
import style from './style.css'

export default function ArrowIcon(props) {
  return (
    <svg className={style.arrowIcon} viewBox="0 0 6 6" {...props}>
      <polygon fill="#fff" points="2.1,5.8 1.4,5.1 3.5,3 1.4,0.9 2.1,0.1 5,3"/>
    </svg>
  )
}

ArrowIcon.propTypes = {
  style: React.PropTypes.object,
}

import React from 'react'
import style from './style.css'

export default function IconClose(props) {
  return (
    <svg className={style.iconClose} viewBox='0 0 20 20' {...props}>
      <polygon points="10.7,10 18,17.3 17.3,18 10,10.7 2.7,18 2,17.3 9.3,10 2,2.7 2.7,2 10,9.3 17.3,2 18,2.7 "/>
    </svg>

  )
}

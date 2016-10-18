import React from 'react'
import style from './style.css'

export default function IconPlus(props) {
  return (
    <svg viewBox="0 0 15 15" width="15" {...props}>
      <path className={style.icon} d="M7.5,0C3.4,0,0,3.4,0,7.5C0,11.6,3.4,15,7.5,15S15,11.6,15,7.5C15,3.4,11.6,0,7.5,0z M7.5,14C3.9,14,1,11.1,1,7.5C1,3.9,3.9,1,7.5,1S14,3.9,14,7.5C14,11.1,11.1,14,7.5,14z"/>
      <polygon className={style.icon} points="12,7 12,8 8,8 8,12 7,12 7,8 3,8 3,7 7,7 7,3 8,3 8,7"/>
    </svg>
  )
}

import React from 'react'
import style from './style.css'

export default function IconInfo(props) {
  return (
    <svg className={style.iconInfo} viewBox="0 0 20 20" {...props}>
      <path d="M9.2,6.6c0-0.2,0.1-0.4,0.2-0.6C9.6,5.9,9.8,5.8,10,5.8c0.2,0,0.4,0.1,0.6,0.2c0.2,0.2,0.2,0.3,0.2,0.6 S10.7,7,10.6,7.1c-0.2,0.2-0.3,0.2-0.6,0.2c-0.2,0-0.4-0.1-0.6-0.2C9.3,7,9.2,6.8,9.2,6.6z M9.5,8.6h1.1v5.7H9.5V8.6z"/>
      <path d="M10,18c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S14.4,18,10,18z M10,3c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7 S13.9,3,10,3z"/>
    </svg>
  )
}

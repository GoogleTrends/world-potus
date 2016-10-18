import React from 'react'
import style from './style.css'

export default function IconUsaDesktop(props) {
  const text = props.usDataEnabled
  ? <text className={style.cls4} transform="translate(45.24 21.59)">HIDE USA</text>
  : <text className={style.cls4} transform="translate(45.24 21.84)" style={{fontFamily: 'Roboto'}}>SHOW USA</text>

  return (
    <svg viewBox="0 0 120.61 35" width="120" className={style.iconUsaDesktop} {...props}>
      <rect className={style.cls1} width="120.61" height="35"/>
      <rect className={style.cls2} x="18.43" y="6.54" width="15.96" height="1.23"/>
      <rect className={style.cls2} x="18.43" y="9.82" width="15.96" height="1.23"/>
      <rect className={style.cls2} x="18.43" y="13.09" width="15.96" height="1.23"/>
      <rect className={style.cls2} x="18.43" y="16.36" width="15.96" height="1.23"/>
      <rect className={style.cls2} x="7.39" y="19.63" width="27" height="1.23"/>
      <rect className={style.cls2} x="7.39" y="22.91" width="27" height="1.23"/>
      <rect className={style.cls2} x="7.39" y="26.18" width="27" height="1.23"/>
      <rect className={style.cls3} x="7.39" y="6.54" width="11.04" height="11.05"/>
      {text}
    </svg>
  )
}

IconUsaDesktop.propTypes = {
  usDataEnabled: React.PropTypes.bool,
}

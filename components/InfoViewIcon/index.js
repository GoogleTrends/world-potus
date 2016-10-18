import React from 'react'
import style from './style.css'

export default function InfoViewIcon(props) {
  return (
    <svg viewBox='0 0 153.39 38.89' style={props.style ? props.style : null}>
      <path className={style.cls1} d="M115,19.45C115,10.22,122.91.52,134,.52L4.16,15.68h0a3.76,3.76,0,1,1,0,7.52h0L134,38.38C121.53,37.76,115,28.68,115,19.45Z"/>
      <circle className={style.cls2} cx="133.96" cy="19.45" r="18.93"/>
      <circle className={style.cls2} cx="4.16" cy="19.45" r="3.66"/>
    </svg>
  )
}

InfoViewIcon.propTypes = {
  style: React.PropTypes.object,
}

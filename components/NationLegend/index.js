import React from 'react'
import style from './style.css'

export default function NationLegend(props) {
  const us = (
    <svg viewBox="0 0 158.1 39" height="50px">
      <g>
        <rect x="15.3" y="14.7" className={style.continentst0} width="142.8" height="10.7"/>
        <text transform="matrix(1 0 0 1 15.2878 20.9011)" className={style.continentstst2} style={{fill: '#FFF', fontSize: '8.2332px'}}>United States</text>
      </g>
      <rect x="14.8" y="1" className={style.continentst0} width="98.5" height="10.3"/>
      <text transform="matrix(1 0 0 1 14.7773 7.1685)" className={style.continentstst2} style={{fill: '#26FF86', fontSize: '8.2332px'}}>USA</text>
      <radialGradient id="SVGID_1_" cx="6.0559" cy="4.2114" r="2.5" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{stopColor: '#3AFF8B'}}/>
        <stop offset="1" style={{stopColor: '#3AFF9B'}}/>
      </radialGradient>
      <circle className={style.continentst5} cx="6.1" cy="4.2" r="2.5"/>
      <g>
        <path className={style.continentst1} d="M8.6,17.7c0-0.3,0.2-0.5,0.5-0.5l0,0c0.3,0,0.5,0.2,0.5,0.5l0,0c0,0.3-0.2,0.5-0.5,0.5l0,0
        C8.8,18.2,8.6,18,8.6,17.7z M5.6,17.7c0-0.3,0.2-0.5,0.5-0.5l0,0c0.3,0,0.5,0.2,0.5,0.5l0,0c0,0.3-0.2,0.5-0.5,0.5l0,0
        C5.8,18.2,5.6,18,5.6,17.7z M2.6,17.7c0-0.3,0.2-0.5,0.5-0.5l0,0c0.3,0,0.5,0.2,0.5,0.5l0,0c0,0.3-0.2,0.5-0.5,0.5l0,0
        C2.8,18.2,2.6,18,2.6,17.7z"/>
      </g>
      <rect x="15.3" y="28.2" className={style.continentst0} width="142.8" height="10.7"/>
      <text transform="matrix(1 0 0 1 15.2878 34.4246)" className={style.continentst2} style={{fill: '#FFFFFF', fontSize: '8.2332px', opacity: 0.5}}>World Average</text>
      <g className={style.continentst7}>
        <path className={style.continentst1} d="M10.1,32h-8c-0.3,0-0.5-0.2-0.5-0.5S1.8,31,2.1,31h8c0.3,0,0.5,0.2,0.5,0.5S10.3,32,10.1,32z"/>
      </g>
    </svg>

  )

  const countries = (
    <svg viewBox="0 0 158.1 39" height="50px">
      <g>
        <rect x="15.3" y="14.7" className={style.st0} width="142.8" height="10.7"/>
        <text transform="matrix(1 0 0 1 15.2878 20.9011)" className={style.st2} style={{fill: '#FFF', fontSize: '8.2332px'}}>United States</text>
      </g>
      <rect x="14.8" y="1" className={style.st0} width="98.5" height="10.3"/>
      <text transform="matrix(1 0 0 1 14.7773 7.1685)" className={style.st2} style={{fill: '#FFEB3B', fontSize: '8.2332px'}}>Country</text>
      <radialGradient id="SVGID_1_" cx="6.0559" cy="4.2114" r="2.5" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{stopColor: '#FFEB3B'}}/>
        <stop offset="0.3336" style={{stopColor: '#FBEB3B'}}/>
        <stop offset="0.6822" style={{stopColor: '#EEEB3B'}}/>
        <stop offset="1" style={{stopColor: '#DCEB3B'}}/>
      </radialGradient>
      <circle className={style.st5} cx="6.1" cy="4.2" r="2.5"/>
      <g>
        <path className={style.st1} d="M8.6,17.7c0-0.3,0.2-0.5,0.5-0.5l0,0c0.3,0,0.5,0.2,0.5,0.5l0,0c0,0.3-0.2,0.5-0.5,0.5l0,0
        C8.8,18.2,8.6,18,8.6,17.7z M5.6,17.7c0-0.3,0.2-0.5,0.5-0.5l0,0c0.3,0,0.5,0.2,0.5,0.5l0,0c0,0.3-0.2,0.5-0.5,0.5l0,0
        C5.8,18.2,5.6,18,5.6,17.7z M2.6,17.7c0-0.3,0.2-0.5,0.5-0.5l0,0c0.3,0,0.5,0.2,0.5,0.5l0,0c0,0.3-0.2,0.5-0.5,0.5l0,0
        C2.8,18.2,2.6,18,2.6,17.7z"/>
      </g>
      <rect x="15.3" y="28.2" className={style.st0} width="142.8" height="10.7"/>
      <text transform="matrix(1 0 0 1 15.2878 34.4246)" className={style.st2} style={{fill: '#FFFFFF', fontSize: '8.2332px', opacity: 0.5}}>World Average</text>
      <g className={style.st7}>
        <path className={style.st1} d="M10.1,32h-8c-0.3,0-0.5-0.2-0.5-0.5S1.8,31,2.1,31h8c0.3,0,0.5,0.2,0.5,0.5S10.3,32,10.1,32z"/>
      </g>
    </svg>
  )

  return (
    props.isUs ? us : countries
  )
}

NationLegend.propTypes = {
  isUs: React.PropTypes.bool,
}

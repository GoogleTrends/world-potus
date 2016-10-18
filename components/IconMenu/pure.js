import React from 'react'
import styles from './style.css'

export default function IconMenu(props) {
  return (
    <div className={styles.iconMenuContainer} {...props}>
      <svg className={styles.iconMenu} viewBox='0 0 20 16'>
        <rect y='0' width='25' height='2'/>
        <rect y='7' width='25' height='2'/>
        <rect y='14' width='25' height='2'/>
      </svg>
    </div>
  )
}

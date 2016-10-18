import React from 'react'
import style from './style.css'

export default function Sidebar(props) {
  const { children } = props

  return (
    <div className={style.Sidebar}>
      {children}
    </div>
  )
}

Sidebar.propTypes = {
  children: React.PropTypes.node,
}

import React from 'react'
import styles from './style.css'

export default class Line extends React.Component {
  render() {
    return <line className={styles.line} {...this.props}></line>
  }
}

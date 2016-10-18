import React from 'react'
import getText from 'getText'
import styles from './style.css'
import COUNTRIES from '../../countries.json'

const EXTERNAL_LINK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="12">
    <path className={styles.candidateLinkIcon} d="M90.474 5.04H61.789c-2.3 0-4.164 1.864-4.164 4.164s1.864 4.164 4.164 4.164h19.095L40.02 54.232c-1.627 1.626-1.627 4.263 0 5.889.813.813 1.879 1.22 2.944 1.22s2.131-.407 2.944-1.22L86.31 19.718v18.17c0 2.3 1.864 4.164 4.164 4.164s4.164-1.864 4.164-4.164V9.204c0-2.3-1.864-4.164-4.164-4.164z"/>
    <path className={styles.candidateLinkIcon} d="M76.071 46.976c-2.3 0-4.164 1.864-4.164 4.164v32.852c0 1.505-1.271 2.776-2.776 2.776h-53.09c-1.505 0-2.776-1.271-2.776-2.776v-53.09c0-1.505 1.271-2.776 2.776-2.776h32.968c2.3 0 4.164-1.864 4.164-4.164s-1.864-4.164-4.164-4.164H16.041c-6.123 0-11.104 4.981-11.104 11.104v53.09c0 6.123 4.981 11.104 11.104 11.104h53.09c6.123 0 11.104-4.981 11.104-11.104V51.14c0-2.299-1.864-4.164-4.164-4.164z"/>
  </svg>
)

export default function ExplainingBaloon(props) {
  const {
    selectedTopic,
    candidate,
    expanded,
    usDataEnabled,
    isDesktop,
    country,
  } = props

  const candidateName = candidate === 'HC' ? 'Hillary Clinton' : 'Donald Trump'
  const isThereATopic = selectedTopic.slug !== 'candidates'
  const topicName = isThereATopic ? getText(`topic_slug_${selectedTopic.slug}`) : ''
  const searchInterest = country ? 'search interest' : (usDataEnabled ? 'global search interest' : 'search interest outside the US')
  const byRegion = country ? ` in ${COUNTRIES[country].name}` : (expanded ? ', in the top 12 countries' : ', grouped by world region')
  const candidateLinkQuery = `${candidateName} ${topicName}`.replace(/\s/g, '+').replace(/\+$/g, '')
  const candidateLink = `https://www.google.com/search?q=${candidateLinkQuery}`

  return (
    <div style={{ display: 'block' }}>
      <span>You are looking at </span>
      <span>{searchInterest} </span>
      <span>for <strong>{candidateName}</strong></span>
      {(isThereATopic && !country) &&
        <span> and <strong>{topicName}</strong></span>
      }
      {
        country &&
        <span> + <strong>all topics</strong></span>
      }
      <span><strong>{byRegion}</strong>. </span>
      {isDesktop && <span><br/><br/></span>}
      <a href={candidateLink} target="_blank" className={styles.candidateLink}>
        More about {candidateName} and this issue {EXTERNAL_LINK_ICON}
      </a>
    </div>
  )
}

ExplainingBaloon.propTypes = {
  selectedTopic: React.PropTypes.object.isRequired,
  candidate: React.PropTypes.oneOf(['HC', 'DT']).isRequired,
  expanded: React.PropTypes.bool.isRequired,
  usDataEnabled: React.PropTypes.bool.isRequired,
  isDesktop: React.PropTypes.bool.isRequired,
  country: React.PropTypes.string,
}

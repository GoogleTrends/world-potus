const init = {
  topicSlug: 'candidates',
  topicCount: 0,
}

export default function (state = init, action) {
  switch (action.type) {
    case 'CHANGE_ENTITY':
      throw new Error('CHANGE_ENTITY was removed, use CHANGE_TOPIC / INCREMENT_TOPIC / DECREMENT_TOPIC')
    case 'CHANGE_TOPIC':
      if (action.topicId) throw new Error(`CHANGE_TOPIC doesn't use topicId but topicSlug now.`)
      return {...state, topicSlug: action.topicSlug}
    case 'REQUEST_DATA_SUCCESS':
      return {...state, topicCount: action.topicsData.topics.length}
    case 'TOGGLE_MENU':
      const open = state.userMenuOpen
      return {...state, menuOpen: !open}
  }
  return state
}

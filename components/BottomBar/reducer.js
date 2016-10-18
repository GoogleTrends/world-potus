let init = {
  infoViewOpen: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case 'TOGGLE_INFO_VIEW':
      return {...state, infoViewOpen: !state.infoViewOpen}
  }
  return state
}

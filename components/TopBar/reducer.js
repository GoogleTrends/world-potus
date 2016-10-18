let init = {
  menuOpen: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      const open = state.menuOpen
      return {...state, menuOpen: !open}
  }
  return state
}

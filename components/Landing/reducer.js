let init = {
  init: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case 'INIT':
      return {...state, init: true}
  }
  return state
}

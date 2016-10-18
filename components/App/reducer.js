import { combineReducers } from 'redux'

import viewReducer from 'View/reducer'
import landingReducer from 'Landing/reducer'
import topBarReducer from 'TopBar/reducer'
import menuReducer from 'Menu/reducer'
import quotesReducer from 'Quotes/reducer'
import gooeyBubblesReducer from 'GooeyBubbles/reducer'
import bottomBarReducer from 'BottomBar/reducer'
import { reducer as resizeReducer } from 'resizedWindowMiddleware'

export default combineReducers({
  view:               viewReducer,
  landing:            landingReducer,
  topBar:             topBarReducer,
  menu:               menuReducer,
  quotes:             quotesReducer,
  gooeyBubbles:       gooeyBubblesReducer,
  bottomBar:          bottomBarReducer,
  resize:             resizeReducer,
  country:            (state = null, action) => action.type === 'CHANGE_COUNTRY' ? action.countryCode : state,
})

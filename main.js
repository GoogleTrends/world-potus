import 'babel-polyfill'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'App/sagas'
import App from 'App'
import rootReducer from 'App/reducer'
import resizedWindowMiddleware from 'resizedWindowMiddleware'
import createRoutingMiddleware from 'microRoutingMiddleware'
import { urlConfig, pageSelector, subStateToUrl, urlToSegments } from 'routing'

const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = createRoutingMiddleware({ urlConfig, pageSelector, subStateToUrl, urlToSegments })

const reduxStoreEnhancers = [
  applyMiddleware(sagaMiddleware, routingMiddleware, resizedWindowMiddleware),
]

if (process.env.NODE_ENV !== 'production') {
  const freezeStateMiddleware = require('redux-freeze')
  const createLogger = require('redux-logger')
  const loggerMiddleware = createLogger({
    collapsed: true,
    duration: true,
    diff: true,
    titleFormatter: (action, time, took) => `Action: ${action.type}  ${took > 10 ? `(in ${took.toFixed(2)} ms)` : ''}`,
  })
  reduxStoreEnhancers.unshift(applyMiddleware(freezeStateMiddleware))
  reduxStoreEnhancers.push(applyMiddleware(loggerMiddleware))
  if (window.devToolsExtension) reduxStoreEnhancers.push(window.devToolsExtension())
}

const store = createStore(rootReducer, compose(...reduxStoreEnhancers))

sagaMiddleware.run(rootSaga)

render(<App store={store} />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('App', () => {
    console.info('[HOT] main.js accepts App')
    unmountComponentAtNode(document.getElementById('root'))
    const App_ = require('App').default
    render(<App_ store={store} />, document.getElementById('root'))
  })
}

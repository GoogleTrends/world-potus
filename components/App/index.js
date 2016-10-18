import React from 'react'
import { Provider, connect } from 'react-redux'

import { onRequestData } from 'App/actions/dataActions'
import { pageSelector } from 'routing'
import LandingDesktop from 'LandingDesktop'
import Landing from 'Landing'
import View from 'View'
import Ripple from 'Ripple'
import Country from 'Country'
import LandscapeAlert from 'LandscapeAlert'
import WebglAlert from 'WebglAlert'
import BrowserAlert from 'BrowserAlert'
import Detector from '../webglDetector'
import isIE from 'utils'

const connectPage = connect((state) => ({
  page: pageSelector(state),
  isDesktop: state.resize.isDesktop,
  isMobiLandscape: state.resize.isMobiLandscape,
}))

const Page = connectPage(({ page, isDesktop, isMobiLandscape }) => {
  if (isMobiLandscape) {
    return <LandscapeAlert />
  }
  if (!Detector.webgl) {
    return <WebglAlert />
  }
  if (isIE) {
    return <BrowserAlert />
  }
  switch (page) {
    case 'landing':
      return <Ripple>{isDesktop ? <LandingDesktop /> : <Landing />}</Ripple>

    case 'topic-trump':
    case 'candidate-trump':
    case 'topic-clinton':
    case 'candidate-clinton':
      return <Ripple><View /></Ripple>

    case 'country':
      return <Ripple><Country /></Ripple>

    default:
      return <Ripple><h1>404</h1></Ripple>
  }
})

export default class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.store.dispatch(onRequestData({}))
  }

  render() {
    const store = this.props.store

    return (
      <Provider store={store}>
        <Page />
      </Provider>
    )
  }
}

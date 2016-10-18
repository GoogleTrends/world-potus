import fetch from 'isomorphic-fetch'
import { timeFormat } from 'd3'

const today = timeFormat("%Y-%m-%d")(new Date())

const BUBBLES_US_DATA_URL = `./data/data_a_us.json?cache=${today}`
const BUBBLES_NO_US_DATA_URL = `./data/data_a_no_us.json?cache=${today}`

const jsonFetch = function (url) {
  return fetch(url)
    .then(response =>
      response.code >= 400
      ? response.json().then(j => Promise.reject(j))
      : response.json()
  )
}

export default {
  requestTopicsData(config) {
    return jsonFetch(BUBBLES_US_DATA_URL)
  },
  requestNoUsTopicsData(config) {
    return jsonFetch(BUBBLES_NO_US_DATA_URL)
  },
}

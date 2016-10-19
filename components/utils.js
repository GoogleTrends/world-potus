import { default as _flatten } from 'lodash/flatten'
import { default as _at } from 'lodash/at'

export function log(...args) { console.log(...args, this); return this }

export function noop() {}

export function toArray(obj = this) {
  return Object.keys(obj).map(k => [k, obj[k]])
}

export function toObject(arr = this) {
  return arr.reduce((acc, [k, v]) => { acc[k] = v; return acc }, {})
}

export function mapToObject(mapFn) {
  const obj = this
  const mapped = Object.keys(obj).reduce((acc, key) => {
    acc[key] = mapFn(obj[key], key)
    return acc
  }, {})
  return mapped
}

export function mapToArray(mapFn) {
  const obj = this
  const mapped = Object.keys(obj).reduce((acc, key) => {
    acc.push(mapFn(obj[key], key))
    return acc
  }, [])
  return mapped
}

export function flattened() {
  const arr = this
  return _flatten(arr)
}

export function pickPath(pathInObject) {
  const obj = this
  if (pathInObject.length === 0) return obj

  const [pathFirst, ...pathRest] = pathInObject
  if (pathRest.length === 0) return obj[pathFirst]

  return obj[pathFirst]::pickPath(pathRest)
}

export function pickKeys(keys) {
  const obj = this
  return _at(obj, keys)
}

export function trimLeftRight(char) {
  const str = this
  const n = str.length - 1
  const sliceFrom = str[0] === char ? 1 : 0
  const sliceTo = str[n] === char ? -1 : undefined
  return str.slice(sliceFrom, sliceTo)
}

export function nullOr(changeFn) {
  const value = this
  if (value === null) return null
  if (value === undefined) throw new Error('nullOr: Undefined value, should be null')
  const changedValue = changeFn(value)
  if (changedValue === undefined) throw new Error('nullOr: Undefined changedValue, should be null')
  return changedValue
}

export function isIE() {
  return window.navigator.userAgent.indexOf('MSIE') > -1
}

export function isEdge() {
  return window.navigator.userAgent.indexOf("Edge") > -1
}

export function isFirefox() {
  return window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1
}

export function isSafari() {
  return /^((?!chrome|android).)*safari/.test(window.navigator.userAgent.toLowerCase())
}

export function isTouch() {
  return /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase())
}

export function joinClasses(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

export function noExtraProps(propsValues, prop, displayName) {
  const propTypes = this
  const extra = Object.keys(propsValues)
  .filter(k => k[0] !== '_')
  .filter(k => !propTypes.hasOwnProperty(k))

  if (extra.length > 0) {
    const s = extra.length > 1 ? 's' : ''
    return new Error(`Non-validated prop${s} supplied to ${displayName}: {${extra.join(', ')}}.`)
  }
}

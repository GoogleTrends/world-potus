export function makeOptional(propTypeValidation) {
  const optionalPropType = (...a) => propTypeValidation(...a)
  optionalPropType.__optional__ = true
  return optionalPropType
}

export function isOptional(...args) {
  const propTypeValidation = this
  if (args.length === 0) throw new Error("::isOptional must not be executed!")
  if (typeof propTypeValidation !== 'function') throw new Error("::isOptional must be used as binding!")
  return makeOptional(propTypeValidation)(...args)
}

function requiredByDefault(propTypes) {
  Object.keys(propTypes).forEach(propKey => {
    if (propTypes[propKey].__optional__) return
    if (typeof propTypes[propKey].isRequired === 'function') {
      propTypes[propKey] = propTypes[propKey].isRequired
    }
  })
  return propTypes
}

function _noExtraProps_(propsValues, prop, displayName) {
  const propTypes = this
  const extra = Object.keys(propsValues)
  .filter(k => k[0] !== '_')
  .filter(k => !propTypes.hasOwnProperty(k))

  if (extra.length > 0) {
    const s = extra.length > 1 ? 's' : ''
    return new Error(`Non-validated prop${s} supplied to ${displayName}: {${extra.join(', ')}}.`)
  }
}

export default function strictProps(propTypes) {
  propTypes._noExtraProps_ = _noExtraProps_
  return requiredByDefault(propTypes)
}

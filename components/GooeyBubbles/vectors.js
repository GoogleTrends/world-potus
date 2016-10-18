export function sum(u) {
  const v = this
  return v.map((_, i) => v[i] + u[i])
}

export function subtract(u) {
  const v = this
  return v.map((_, i) => v[i] - u[i])
}

export function multiply(u) {
  const v = this
  if (Array.isArray(u)) {
    return v.map((_, i) => v[i] * u[i])
  } else {
    return v.map((_, i) => v[i] * u)
  }
}

export function modulus() {
  const v = this
  return Math.sqrt(v[0] ** 2 + v[1] ** 2)
}

export function distance(v, u) {
  const dist = v::subtract(u)::modulus()
  return dist
}

export function slopeAngle(v, u) {
  const angle = Math.atan2(u[1] - v[1], u[0] - v[0])
  return angle
}

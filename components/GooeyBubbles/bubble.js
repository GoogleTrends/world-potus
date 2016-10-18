import { color as buildColor } from 'd3-color'
import { scaleLinear } from 'd3-scale'
import { sum, multiply, distance, slopeAngle } from './vectors'

const MIN_RADIUSMIN = 10 // Android radialGradient bug

function pixels(length) {
  return length * window.devicePixelRatio
}

function memoize(func) {
  const CACHE = {}

  return (...args) => {
    const key = args.join(',')
    const cached = CACHE[key]
    if (cached !== undefined) return cached

    const calculated = func(...args)
    CACHE[key] = calculated
    return calculated
  }
}

function opaqued(color, opacity) {
  const c = buildColor(color)
  c.opacity = opacity.toFixed(3)
  return c.toString()
}

const opaquedFast = memoize(opaqued)

function clamp(a, b) {
  return (x) => Math.max(a, Math.min(b, x))
}

function smoothstep(min, max) {
  return (x) => {
    const v = clamp(0, 1)((x - min) / (max - min))
    const s = v * v * (3 - 2 * v)
    return s
  }
}

const smooth = smoothstep(0, 1)
const smoothFast = memoize(smooth)

const cusp = x => x < 0.5 ? smoothFast(0.1 * x) * 137.7 / 1.5 : smoothFast(0.1 * (1 - x)) * 137.7 / 1.5
const cuspFast = memoize(cusp)

function drawBubble(radius, center, blur, color) {
  const context = this

  if (!Number.isFinite(radius)) throw new Error(`createBubbleCanvas: radius is invalid: ${radius}`)
  if (!Number.isFinite(center[0])) throw new Error(`createBubbleCanvas: center[0] is invalid: ${center[0]}`)
  if (!Number.isFinite(center[1])) throw new Error(`createBubbleCanvas: center[1] is invalid: ${center[1]}`)
  if (!Number.isFinite(blur)) throw new Error(`createBubbleCanvas: blur is invalid: ${blur}`)
  if (radius <= 0) return

  const radiusMin = Math.max(MIN_RADIUSMIN, radius - blur)
  const radiusMax = Math.max(MIN_RADIUSMIN, radius + blur)

  const boxCenter = center.map(c => c - radiusMax)
  const boxWidth = 2 * radiusMax
  const boxHeight = boxWidth

  const smoothRadGrad = context.createRadialGradient(...center, radiusMin, ...center, radiusMax)

  for (let i = 0; i <= 1; i += 0.1) {
    smoothRadGrad.addColorStop(i, opaquedFast(color, 1.0 - smoothFast(i)))
  }

  context.fillStyle = smoothRadGrad
  context.fillRect(...boxCenter, boxWidth, boxHeight)

  if (window.DEBUG) {
    context.lineWidth = 1
    context.strokeStyle = 'red'
    context.strokeRect(...boxCenter, boxWidth, boxHeight)

    context.lineWidth = radiusMin === MIN_RADIUSMIN ? 5 : 1
    context.strokeStyle = 'black'
    context.beginPath()
    context.arc(...center, radiusMin, 0, 2 * Math.PI, false)
    context.stroke()

    context.lineWidth = 1
    context.beginPath()
    context.arc(...center, radius, 0, 2 * Math.PI, false)
    context.stroke()

    context.beginPath()
    context.arc(...center, radiusMax, 0, 2 * Math.PI, false)
    context.stroke()
  }
}

function drawBubbleText(position, text, fontSize = 13) {
  const context = this
  const fontFamily = 'Montserrat'

  context.globalCompositeOperation = "source-over"
  context.fillStyle = 'black'
  context.font = `${pixels(fontSize)}px ${fontFamily}`
  const textMeasure = context.measureText(text)
  const textCenter = [
    -textMeasure.width / 2,
    +pixels(fontSize * 0.7) / 2, // No height in measureText
  ]
  const textPosition = position::sum(textCenter)

  context.fillText(text, ...textPosition)

  if (window.DEBUG) {
    context.strokeStyle = 'blue'
    context.strokeRect(...textPosition, ...textCenter::multiply(-2))
  }
}

function drawBubbleLink(fromPos, toPos, linkWidth, color) {
  const context = this

  const width = linkWidth

  const length = distance(fromPos, toPos)
  const ang = slopeAngle(fromPos, toPos)
  console.assert(Math.atan2(toPos[1] - fromPos[1], toPos[0] - fromPos[0]) === ang)

  const gradient = context.createLinearGradient(0, -width / 2, 0, width / 2)
  for (let i = 0; i <= 1; i += 0.1) {
    gradient.addColorStop(i, opaqued(color, cuspFast(i)))
  }

  context.save()

  context.fillStyle = gradient
  context.translate(...fromPos)
  context.rotate(ang)
  context.fillRect(0, -width / 2, length, width)

  if (window.DEBUG) {
    context.strokeStyle = 'grey'
    context.strokeRect(0, -width / 2, length, width)
  }

  context.restore()
}

export function createBubble(canvas, {radius: relativeRadius, position: relativePosition, color, blur: relativeBlur}) {
  const context = canvas.getContext('2d')
  const vecRelToAbs = vec => vec::multiply([canvas.width, canvas.height])
  const numRelToAbs = num => num * Math.min(canvas.width, canvas.height)
  const scaleText = scaleLinear().domain([0, pixels(100)]).range([10, 20]).clamp(true)

  const position = vecRelToAbs(relativePosition)
  const radius = numRelToAbs(relativeRadius)
  const blur = numRelToAbs(relativeBlur)
  const radiusScaledWithBlur = radius > 0 ? Math.sqrt(radius * blur) : 0

  return {
    draw() {
      if (radius > blur) {
        context::drawBubble(radius, position, blur, color)
      } else {
        // Scale blur with radius if very small
        context::drawBubble(radiusScaledWithBlur, position, radiusScaledWithBlur, color)
      }

      if (window.DEBUG) {
        if (radius > 0) context::drawBubbleText(position::sum([0, radiusScaledWithBlur]), radius.toFixed(1))
      }
    },

    drawLink(targetPos, targetRelativeRadius, color) {
      const computedRadius = radius > blur ? radius : radiusScaledWithBlur
      const targetRadius = numRelToAbs(targetRelativeRadius)
      const linkWidth = 1 * Math.min(computedRadius, targetRadius)
      context::drawBubbleLink(position, vecRelToAbs(targetPos), linkWidth, color)
    },

    drawText(text) {
      const size = scaleText(pixels(radius))
      context::drawBubbleText(position, text, size)
    },
  }
}

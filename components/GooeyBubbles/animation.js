import raf from 'raf'

const STEP_MAX = 0.015
const SMALL = 0.00001

function isSmall(x) {
  return Math.abs(x) < SMALL
}

function limitTo(value, limit) {
  if (value < 0) return Math.max(value, -limit)
  return Math.min(value, limit)
}

export function stepper(instantValue, targetValue, timePerFrame, damping, stopped = () => {}) {
  const step = (targetValue - instantValue) * timePerFrame / damping

  if (isSmall(step)) {
    stopped(true)
    return targetValue
  } else {
    stopped(false)
    return instantValue + limitTo(step, STEP_MAX)
  }
}

export function animationLoop(ticker) {
  let loopId
  let previousTime
  raf(t => {
    previousTime = t

    loopId = raf(function loop(time) {
      const frameTime = time - previousTime
      if (window.PERFORMANCE) {
        const skippedFrames = Math.round(frameTime * 6 / 100)
        skippedFrames > 4 && console.warn(`GooeyBubbles animation: ${skippedFrames} skipped frames.`)
      }

      ticker(frameTime)
      previousTime = time

      raf(loop)
    })
  })

  return {
    cancel() {
      raf.cancel(loopId)
    },
  }
}

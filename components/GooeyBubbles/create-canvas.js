export default function createCanvas(width, height, dpi = window.devicePixelRatio) {
  const canvas = document.createElement("canvas")
  canvas.width = width * dpi
  canvas.height = height * dpi
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  return canvas
}
export function sizeCanvas(canvas, width, height, dpi = window.devicePixelRatio) {
  canvas.width = width * dpi
  canvas.height = height * dpi
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  return canvas
}

export function clearCanvas(canvas) {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
}

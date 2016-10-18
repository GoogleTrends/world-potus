import GL from './GL'

import vertShader from './shaders/simple.vert'
import fragShader from './shaders/goo.frag'

export default class AlphaContrastRenderer {
  constructor(canvasOut, canvasIn, {alphaMultiply = 1, alphaSubtract = 0} = {}) {
    this.canvasOut = canvasOut
    this.canvasIn = canvasIn
    this.alphaMultiply = alphaMultiply
    this.alphaSubtract = alphaSubtract

    this.gl = new GL(this.canvasOut, {alpha: true, premultipliedAlpha: true}, vertShader, fragShader)
    this.program = this.gl.program

    this.updateSize()
    this.gl.createUniform("1f", "alphaMultiply", this.alphaMultiply)
    this.gl.createUniform("1f", "alphaSubtract", this.alphaSubtract)

    this.gl.createTexture(null, 0)
    this.gl.activeTexture(0)
  }

  draw() {
    this.gl.useProgram(this.program)
    this.updateTexture()
    this.gl.draw()
  }

  updateTexture() {
    this.gl.activeTexture(0)
    this.gl.updateTexture(this.canvasIn)
  }

  updateSize() {
    this.gl.updateViewportSize()
    this.gl.createUniform("2f", "resolution", this.canvasOut.width, this.canvasOut.height)
  }
}

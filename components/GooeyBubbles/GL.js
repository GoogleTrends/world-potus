import * as WebGL from "./WebGl"

function GL(canvas, options, vert, frag) {
  this.init(canvas, options, vert, frag)
}
GL.prototype = {
  canvas: null,
  gl: null,
  program: null,
  init(canvas, options, vert, frag) {
    this.canvas = canvas
    this.gl = WebGL.getContext(canvas, options)
    this.program = this.createProgram(vert, frag)
    this.useProgram(this.program)
  },
  createProgram(vert, frag) {
    let program = WebGL.createProgram(this.gl, vert, frag)
    return program
  },
  useProgram(program) {
    this.program = program
    this.gl.useProgram(program)
  },
  createTexture(source, i) {
    return WebGL.createTexture(this.gl, source, i)
  },
  createUniform(type, name, ...v) {
    WebGL.createUniform(this.gl, this.program, type, name, ...v)
  },
  activeTexture(i) {
    WebGL.activeTexture(this.gl, i)
  },
  updateTexture(source) {
    WebGL.updateTexture(this.gl, source)
  },
  draw() {
    WebGL.setRectangle(this.gl, -1, -1, 2, 2)
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
  },
  updateViewportSize() {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
  },
}

export default GL

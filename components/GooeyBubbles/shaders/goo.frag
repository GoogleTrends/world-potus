precision mediump float;

// textures
uniform sampler2D u_waterMap;

// the texCoords passed in from the vertex shader.
uniform vec2 u_resolution;
uniform float u_alphaMultiply;
uniform float u_alphaSubtract;

vec4 multiplyAlpha(vec4 pixel) {
  pixel.rgb *= pixel.a;
  return pixel;
}

vec4 alphaContrast(vec4 pixel, float alphaMul, float alphaSub) {
  pixel.a = clamp(pixel.a * alphaMul - alphaSub, 0.0, 1.0);
  return pixel;
}

vec2 texCoord() {
  return vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y) / u_resolution;
}

void main() {
  vec4 pixel = texture2D(u_waterMap, texCoord());
  pixel = alphaContrast(pixel, u_alphaMultiply, u_alphaSubtract);
  pixel = multiplyAlpha(pixel); // Cross-browser for premultiplyAlpha: false
  gl_FragColor = pixel;
}

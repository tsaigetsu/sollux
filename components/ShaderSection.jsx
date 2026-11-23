import { useEffect, useRef } from 'react'

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`

// Czas wchodzi do szumu tylko przez cos/sin(t * 2π / LOOP), więc pętla jest idealnie ciągła.
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_phase;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = vec2(uv.x * u_res.x / u_res.y, uv.y) * 1.6;
  vec2 c = vec2(cos(u_phase), sin(u_phase)) * 0.7;

  vec2 q = vec2(fbm(p + c), fbm(p + vec2(5.2, 1.3) - c.yx));
  float f = fbm(p + 2.0*q + c*0.5);

  float mask = smoothstep(0.05, 1.1, uv.x*0.65 + (1.0 - uv.y)*0.95);
  float k = clamp(mask * (0.35 + 1.1*f) , 0.0, 1.0);

  vec3 dark = vec3(0.04, 0.04, 0.035);
  vec3 mid  = vec3(0.45, 0.33, 0.04);
  vec3 gold = vec3(0.95, 0.72, 0.1);
  vec3 col = mix(dark, mid, smoothstep(0.0, 0.55, k));
  col = mix(col, gold, smoothstep(0.5, 1.0, k));
  gl_FragColor = vec4(col, 1.0);
}`

const LOOP_SECONDS = 25

export default function ShaderSection() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const sh = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uPhase = gl.getUniformLocation(prog, 'u_phase')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    const start = performance.now()
    const draw = (now) => {
      const t = reduce ? 0 : ((now - start) / 1000) % LOOP_SECONDS
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uPhase, (t / LOOP_SECONDS) * Math.PI * 2)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="shader">
      <canvas ref={canvasRef} className="shader__canvas" />
      <div className="shader__content">
        <h2>Twoje wnętrze zasługuje na<br />wyjątkowe światło</h2>
        <a href="#" className="btn btn--yellow">Kup teraz</a>
        <p>Od 119 zł na oficjalnej stronie<br />producenta SOLLUX</p>
      </div>
    </section>
  )
}

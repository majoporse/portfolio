import { useEffect, useRef, useState } from "react";

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blur, setBlur] = useState(15);
  const [vignette, setVignette] = useState(0.4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
    if (!gl) return;

    // Capture canvas and gl in closure
    const canvasCtx = canvas;
    const glCtx = gl;

    // Vertex Shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader with 3D Simplex Noise
    const fragmentShaderSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_frequency;
      uniform float u_contrast;

      // 3D Simplex Noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv *= u_frequency;

        float noiseVal = snoise(vec3(uv * 10.0, u_time * 0.5));
        float pattern = sin(noiseVal * u_contrast);

        float hardEdge = step(0.0, pattern);

        vec3 baseColor = vec3(0.0);
        vec3 accentColor = vec3(1.0, 0.16, 0.16);

        vec3 finalColor = mix(baseColor, accentColor, hardEdge);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile Shader
    function compileShader(source: string, type: number) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(vertexShaderSource, glCtx.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, glCtx.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = glCtx.createProgram();
    if (!program) return;

    glCtx.attachShader(program, vertexShader);
    glCtx.attachShader(program, fragmentShader);
    glCtx.linkProgram(program);

    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
      console.error("Program link error:", glCtx.getProgramInfoLog(program));
      return;
    }

    glCtx.useProgram(program);

    // Set up geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buffer);
    glCtx.bufferData(glCtx.ARRAY_BUFFER, positions, glCtx.STATIC_DRAW);

    const positionLoc = glCtx.getAttribLocation(program, "position");
    glCtx.enableVertexAttribArray(positionLoc);
    glCtx.vertexAttribPointer(positionLoc, 2, glCtx.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLoc = glCtx.getUniformLocation(program, "u_resolution");
    const timeLoc = glCtx.getUniformLocation(program, "u_time");
    const frequencyLoc = glCtx.getUniformLocation(program, "u_frequency");
    const contrastLoc = glCtx.getUniformLocation(program, "u_contrast");

    // Parameters
    const params = {
      frequency: 0.1,
      contrast: 800.0,
      speed: 1.0,
    };

    // Time tracking
    let accumulatedTime = 0;
    let lastTime = performance.now();

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvasCtx.width = window.innerWidth * dpr;
      canvasCtx.height = window.innerHeight * dpr;
      glCtx.viewport(0, 0, canvasCtx.width, canvasCtx.height);
      glCtx.uniform2f(resolutionLoc!, canvasCtx.width, canvasCtx.height);
    }

    window.addEventListener("resize", resize);
    resize();

    function render(currentTime: number) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      accumulatedTime += (deltaTime * 0.001) * params.speed;

      glCtx.uniform1f(timeLoc!, accumulatedTime);
      glCtx.uniform1f(frequencyLoc!, params.frequency);
      glCtx.uniform1f(contrastLoc!, params.contrast);

      glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (program) glCtx.deleteProgram(program);
      if (buffer) glCtx.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, transparent 0%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />
    </div>
  );
}

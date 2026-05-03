import { useEffect, useRef, useState } from "react";
import { getTheme, subscribe } from '../context/themeStore';

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Post-processing parameters
  const [blur, setBlur] = useState(4); // Glass blur intensity (pixels)
  const [vignette, setVignette] = useState(1.0); // Vignette darkness (0.0 = transparent, 1.0 = black)
  const [vignetteStrength, setVignetteStrength] = useState(1.0); // Vignette strength multiplier (0.0 - 2.0)
  
  // Theme-aware color configuration
  const themeConfig = {
    dark: {
      background: "#050505",
      patternBlack: "#ffffff",
      patternAccent: "#b93d27",
    },
    light: {
      background: "#f5f5f5",
      patternBlack: "#333333",
      patternAccent: "#b93d27",
    },
  };

  // Get theme from store and subscribe to changes
  const [theme, setTheme] = useState(getTheme());
  
  useEffect(() => {
    const unsubscribe = subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  const currentTheme = themeConfig[theme];

  const [offsetX, setOffsetX] = useState(0.0); // X offset for starting position
  const [offsetY, setOffsetY] = useState(0.0); // Y offset for starting position

  // Shader parameters (using refs to avoid recreating WebGL context)
  const frequencyRef = useRef(0.1); // Scale/zoom of noise pattern (0.01 - 2.0)
  const contrastRef = useRef(800.0); // Pattern density/chaos (10.0 - 2000.0)
  const speedRef = useRef(0.5); // Animation speed multiplier (0.0 - 1.0)
  const offsetXRef = useRef(0.0); // X offset for starting position
  const offsetYRef = useRef(0.0); // Y offset for starting position

  // Sync refs with state (optional - can be removed if not needed for UI)
  const [frequency, setFrequency] = useState(0.5);
  const [contrast, setContrast] = useState(0);
  const [speed, setSpeed] = useState(0.02);

  const [scrollContrast, setScrollContrast] = useState(0);
  const [scrollScale, setScrollScale] = useState(0);
  const [speedScroll, setSpeedScroll] = useState(0);

  // Update refs when state changes
  frequencyRef.current = frequency + scrollScale; // Combine base frequency with scroll-based scale
  contrastRef.current = contrast + scrollContrast; // Combine base contrast with scroll-based contrast
  speedRef.current = speed + speedScroll;
  offsetXRef.current = offsetX;
  offsetYRef.current = offsetY;

  // Calculate scroll-based contrast (100 at top, 1 at bottom) and scale (0 at top, 1 at bottom)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      const scrollContrastValue = scrollPercent * 500; // 100 to 1
      setScrollContrast(scrollContrastValue);

      const scrollScaleValue = scrollPercent * 0.0;
      setScrollScale(scrollScaleValue);

      const speedScrollValue = scrollPercent * -0.017;
      setSpeedScroll(speedScrollValue);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      console.log("WebGL not supported");
      return;
    }
    console.log("WebGL context created successfully");

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
      uniform vec3 u_accentColor;
      uniform vec3 u_blackColor;
      uniform vec2 u_offset;

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
        vec2 uv = gl_FragCoord.xy / u_resolution.xy + u_offset;
        float n = snoise(vec3(uv * u_frequency, u_time));

        // Generate pattern using contrast for density
        // Note: sin() creates repeating patterns - higher contrast = more repeats
        float pattern = sin(n * u_contrast);

        // Use contrast to control red/black ratio (0 = only black, 1 = only red)
        // Map contrast (0-2000) to ratio (0-1)
        float ratio = u_contrast / 2000.0;

        // Convert ratio to threshold: 0% red → threshold = 1, 100% red → threshold = -1
        float threshold = 1.0 - (ratio * 2.0);
        float stepVal = step(threshold, pattern);

        gl_FragColor = vec4(mix(u_blackColor, u_accentColor, stepVal), 1.0);
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
    const fragmentShader = compileShader(
      fragmentShaderSource,
      glCtx.FRAGMENT_SHADER,
    );

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
    const accentColorLoc = glCtx.getUniformLocation(program, "u_accentColor");
    const blackColorLoc = glCtx.getUniformLocation(program, "u_blackColor");
    const offsetLoc = glCtx.getUniformLocation(program, "u_offset");

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

    // Helper to convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
          }
        : { r: 0.725, g: 0.239, b: 0.153 };
    };

    function render(currentTime: number) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      accumulatedTime += deltaTime * 0.001 * speedRef.current;

      glCtx.uniform1f(timeLoc!, accumulatedTime);
      glCtx.uniform1f(frequencyLoc!, frequencyRef.current);
      glCtx.uniform1f(contrastLoc!, contrastRef.current);
      
      const accentRgb = hexToRgb(currentTheme.patternAccent);
      glCtx.uniform3f(accentColorLoc!, accentRgb.r, accentRgb.g, accentRgb.b);
      
      const blackRgb = hexToRgb(currentTheme.patternBlack);
      glCtx.uniform3f(blackColorLoc!, blackRgb.r, blackRgb.g, blackRgb.b);
      
      glCtx.uniform2f(offsetLoc!, offsetXRef.current, offsetYRef.current);

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
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundColor: currentTheme.background,
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
            background: `radial-gradient(circle, transparent 0%, rgba(0,0,0,${vignette * vignetteStrength}) 100%)`,
          }}
        />
      </div>


    </>
  );
}

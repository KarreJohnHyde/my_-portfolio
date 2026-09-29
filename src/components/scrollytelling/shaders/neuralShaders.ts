/**
 * GLSL Shaders for the Neural Knowledge Torus & Vector Embedding Manifold
 * Cyberpunk / Neo-brutalist palette: Electric Lime (#00FF66), Cyber Yellow (#D4FF00), Electric Cyan (#00F0FF)
 */

export const neuralVertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uNoiseFrequency;
  uniform float uDpr;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;

  attribute vec3 aRandomPoint;      // Stage 1: High-dimensional scattered vector cloud
  attribute vec3 aTorusPoint;       // Stage 2: FAISS topological similarity clusters
  attribute vec3 aBeamPoint;        // Stage 3: Concentrated axial energy beam & query vectors
  attribute vec3 aLatticePoint;     // Stage 4: Stabilized crystalline deployment lattice
  attribute float aRandom;
  attribute float aSize;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vProgress;

  // Simplex-inspired 3D noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    vec3 ns = 0.142857142857 * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vProgress = uProgress;

    // Multi-stage morphological position interpolation
    vec3 pos;
    if (uProgress < 0.25) {
      // Stage 1: High-dimensional scattered vector cloud -> beginning to align
      float t = smoothstep(0.0, 0.25, uProgress);
      pos = mix(aRandomPoint, aTorusPoint, t * 0.4);
    } else if (uProgress < 0.50) {
      // Stage 2: Dense geometric neural torus & FAISS cluster collapse
      float t = smoothstep(0.25, 0.50, uProgress);
      pos = mix(mix(aRandomPoint, aTorusPoint, 0.4), aTorusPoint, t);
    } else if (uProgress < 0.75) {
      // Stage 3: Context injection, axial energy beam, semantic node excitation
      float t = smoothstep(0.50, 0.75, uProgress);
      pos = mix(aTorusPoint, aBeamPoint, t);
    } else {
      // Stage 4: Production deployment, stabilized crystalline lattice
      float t = smoothstep(0.75, 1.0, uProgress);
      pos = mix(aBeamPoint, aLatticePoint, t);
    }

    // Procedural fluid noise perturbation
    float noise = snoise(pos * uNoiseFrequency + vec3(uTime * 0.35));
    pos += normalize(pos + vec3(0.001)) * noise * 0.22;

    // Torus orbital spin speed increases during context injection (Stage 3)
    float spinSpeed = 0.25 + smoothstep(0.4, 0.75, uProgress) * 0.85;
    float angle = uTime * spinSpeed + uProgress * 6.28318;
    float cosA = cos(angle);
    float sinA = sin(angle);
    mat2 rotY = mat2(cosA, -sinA, sinA, cosA);
    pos.xz = rotY * pos.xz;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Dynamic point size scaled with camera depth and DPR
    float depthScale = 24.0 / -mvPosition.z;
    float pulse = 0.85 + sin(uTime * 2.5 + aRandom * 6.28) * 0.25;
    gl_PointSize = aSize * depthScale * pulse * (uDpr * 0.55);

    // Color gradient across stages:
    // Stage 1: Shimmering raw vector white/cyan
    // Stage 2: Electric Lime (#00FF66) & Cyber Yellow (#D4FF00) FAISS clusters
    // Stage 3: Glowing energy beam emerald & azure
    // Stage 4: Hyper-coherent neon matrix
    vec3 cCyan = vec3(0.0, 0.94, 1.0);
    vec3 cLime = uColorPrimary;
    vec3 cGold = uColorSecondary;
    vec3 cViolet = vec3(0.68, 0.55, 1.0);

    if (uProgress < 0.25) {
      vColor = mix(cCyan, cLime, uProgress / 0.25);
    } else if (uProgress < 0.50) {
      vColor = mix(cLime, cGold, (uProgress - 0.25) / 0.25);
    } else if (uProgress < 0.75) {
      vColor = mix(cGold, cCyan, (uProgress - 0.50) / 0.25);
    } else {
      vColor = mix(cCyan, cViolet, (uProgress - 0.75) / 0.25);
    }

    vAlpha = 0.6 + 0.4 * sin(uTime * 2.0 + aRandom * 6.28318);
  }
`

export const neuralFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vProgress;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Luminous Gaussian falloff with intense white core
    float glow = smoothstep(0.5, 0.0, dist);
    float core = smoothstep(0.15, 0.0, dist) * 0.95;

    gl_FragColor = vec4(vColor + vec3(core), vAlpha * glow);
  }
`

export const energyBeamVertexShader = `
  uniform float uTime;
  uniform float uProgress;
  varying float vIntensity;

  void main() {
    vec3 pos = position;
    // Axial beam scales and intensifies on Stage 3
    float stageIntensity = smoothstep(0.45, 0.65, uProgress) * (1.0 - smoothstep(0.8, 0.98, uProgress));
    pos.x += sin(uTime * 8.0 + pos.y * 2.0) * 0.08 * stageIntensity;
    pos.z += cos(uTime * 8.0 + pos.y * 2.0) * 0.08 * stageIntensity;

    vIntensity = stageIntensity;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

export const energyBeamFragmentShader = `
  uniform vec3 uColor;
  varying float vIntensity;

  void main() {
    if (vIntensity < 0.02) discard;
    float alpha = vIntensity * 0.75;
    gl_FragColor = vec4(uColor + vec3(0.4), alpha);
  }
`

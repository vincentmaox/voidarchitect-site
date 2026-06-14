"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// 流体噪声 — 基于 simplex noise + domain warping，鼠标位置扭曲场域
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;

  // Simplex noise 3D (Ashima)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  // Domain warp
  float fbm(vec3 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * snoise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uResolution.x / uResolution.y;

    vec2 mouse = (uMouse - 0.5);
    mouse.x *= uResolution.x / uResolution.y;
    float md = length(p - mouse);
    vec2 warp = (p - mouse) / max(md, 0.001) * exp(-md * 4.0) * 0.18;

    vec3 q = vec3(p * 1.4 + warp, uTime * 0.06);
    float n1 = fbm(q);
    float n2 = fbm(q + vec3(n1) * 0.6 + vec3(0.0, 0.0, 1.7));

    // 暗调金 / 烟青 / 墨黑 三色调
    vec3 c0 = vec3(0.04, 0.04, 0.05);
    vec3 c1 = vec3(0.10, 0.13, 0.18);
    vec3 c2 = vec3(0.98, 0.75, 0.14);
    vec3 col = mix(c0, c1, smoothstep(-0.4, 0.6, n1));
    col = mix(col, c2, smoothstep(0.55, 0.95, n2) * 0.55);

    // 鼠标周围加亮
    col += exp(-md * 5.0) * 0.12;

    // 颗粒
    float grain = fract(sin(dot(uv * uResolution, vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.025;

    // vignette
    float vig = smoothstep(1.2, 0.3, length(p));
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FluidPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms as any;
    u.uTime.value = state.clock.elapsedTime;
    // smooth mouse
    mouse.current.lerp(target.current, 0.06);
    u.uMouse.value.copy(mouse.current);
    u.uResolution.value.set(size.width, size.height);
  });

  // 鼠标全局监听
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidHero() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: false }}
      >
        <Suspense fallback={null}>
          <FluidPlane />
        </Suspense>
      </Canvas>
    </div>
  );
}

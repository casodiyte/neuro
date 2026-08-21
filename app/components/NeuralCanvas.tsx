"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMotion;
  uniform vec2 uMouse;
  uniform vec2 uMouseVelocity;

  attribute vec3 aOffset;
  attribute float aRandom;

  varying vec2 vUv;
  varying vec2 vWorld;
  varying float vEnergy;

  mat2 rotate2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vUv = uv;
    vec3 pos = aOffset;

    // A pair of low-frequency vector fields keeps the full particle bed alive.
    float flowX = sin(pos.y * 0.62 + uTime * 0.22 + aRandom * 2.0)
      + sin(pos.y * 1.77 - uTime * 0.11 + aRandom * 6.28);
    float flowY = cos(pos.x * 0.46 - uTime * 0.18 + aRandom * 3.0)
      + cos(pos.x * 1.42 + uTime * 0.13 + aRandom * 5.0);
    pos.xy += vec2(flowX, flowY) * 0.105 * uMotion;

    vec2 relative = pos.xy - uMouse;
    float distanceToMouse = max(length(relative), 0.001);
    float angleToMouse = atan(relative.y, relative.x);
    vec2 pushDirection = relative / distanceToMouse;

    // An imperfect halo breathes, ripples and stretches in the travel direction.
    float organicEdge = sin(angleToMouse * 3.0 + uTime * 0.31) * 0.20
      + sin(angleToMouse * 7.0 - uTime * 0.19 + aRandom * 2.0) * 0.10;
    float breathing = sin(uTime * 0.76) * 0.22 * uMotion;
    float pointerSpeed = clamp(length(uMouseVelocity) * 0.34, 0.0, 1.0);
    float velocityAngle = atan(uMouseVelocity.y, uMouseVelocity.x);
    float directionalStretch = cos(angleToMouse - velocityAngle) * pointerSpeed * 0.58;
    float haloRadius = 2.45 + organicEdge + breathing + directionalStretch;
    float halo = smoothstep(1.42, 0.0, abs(distanceToMouse - haloRadius));
    float innerField = smoothstep(5.2, 0.0, distanceToMouse);
    float core = smoothstep(1.7, 0.05, distanceToMouse);

    float pulse = (sin(uTime * 1.22 - distanceToMouse * 2.1) * 0.5 + 0.5) * uMotion;
    pos.xy += pushDirection * (halo * (0.23 + pulse * 0.34) + core * 0.34);
    pos.z += halo * sin(uTime + aRandom * 5.0) * 0.24 * uMotion;

    float energy = clamp(halo * 0.92 + innerField * 0.26 + core * 0.38, 0.0, 1.0);
    float baseLength = 0.065 + sin(uTime * 0.7 + aRandom * 8.0) * 0.009 * uMotion;
    float particleLength = baseLength + energy * 0.15 + pointerSpeed * halo * 0.06;
    float particleWidth = 0.027 + energy * 0.038;

    vec3 particle = position;
    particle.x *= particleLength;
    particle.y *= particleWidth;
    particle.xy = rotate2d(angleToMouse) * particle.xy;

    vWorld = pos.xy;
    vEnergy = energy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + particle, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying vec2 vUv;
  varying vec2 vWorld;
  varying float vEnergy;

  void main() {
    vec2 pill = abs(vUv - 0.5) * 2.0;
    float shape = pow(pow(pill.x, 3.4) + pow(pill.y, 3.4), 1.0 / 3.4);
    float alphaShape = 1.0 - smoothstep(0.72, 1.0, shape);
    if (alphaShape < 0.02) discard;

    vec3 cyan = vec3(0.35, 0.94, 1.0);
    vec3 violet = vec3(0.65, 0.52, 1.0);
    vec3 coral = vec3(1.0, 0.48, 0.48);
    vec3 deep = vec3(0.045, 0.10, 0.15);

    float zoneA = sin(vWorld.x * 0.42 + uTime * 0.34) * 0.5 + 0.5;
    float zoneB = sin(vWorld.y * 0.58 - uTime * 0.27 + zoneA * 2.2) * 0.5 + 0.5;
    vec3 activeColor = mix(cyan, violet, zoneA);
    activeColor = mix(activeColor, coral, smoothstep(0.60, 0.96, zoneB) * 0.62);
    vec3 color = mix(deep + cyan * 0.12, activeColor, smoothstep(0.04, 0.86, vEnergy));

    float alpha = alphaShape * mix(0.17, 0.96, vEnergy);
    gl_FragColor = vec4(color, alpha);
  }
`;

function pseudoRandom(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -5, 5);
    camera.position.z = 2;

    const uniforms = {
      uTime: { value: 0 },
      uMotion: { value: reducedMotion ? 0 : 1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseVelocity: { value: new THREE.Vector2(0, 0) },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    let mesh: THREE.Mesh<THREE.InstancedBufferGeometry, THREE.ShaderMaterial> | null = null;
    let worldWidth = 1;
    const worldHeight = 22;
    let frame = 0;
    let lastTime = performance.now();
    const targetMouse = new THREE.Vector2(0, 0);
    const previousMouse = new THREE.Vector2(0, 0);
    const smoothedVelocity = new THREE.Vector2(0, 0);
    const instantaneousVelocity = new THREE.Vector2(0, 0);

    const createField = () => {
      if (mesh) {
        scene.remove(mesh);
        mesh.geometry.dispose();
      }

      const spacing = window.innerWidth < 700 ? 0.45 : 0.39;
      const countX = Math.ceil(worldWidth / spacing) + 4;
      const countY = Math.ceil(worldHeight / spacing) + 4;
      const count = countX * countY;
      const offsets = new Float32Array(count * 3);
      const randoms = new Float32Array(count);
      let cursor = 0;

      for (let y = 0; y < countY; y += 1) {
        for (let x = 0; x < countX; x += 1) {
          const random = pseudoRandom(cursor + 1);
          offsets[cursor * 3] = (x - (countX - 1) / 2) * spacing + (random - 0.5) * 0.12;
          offsets[cursor * 3 + 1] = (y - (countY - 1) / 2) * spacing + (pseudoRandom(cursor + 91) - 0.5) * 0.12;
          offsets[cursor * 3 + 2] = 0;
          randoms[cursor] = random;
          cursor += 1;
        }
      }

      const plane = new THREE.PlaneGeometry(1, 1);
      const geometry = new THREE.InstancedBufferGeometry();
      geometry.setIndex(plane.index);
      geometry.setAttribute("position", plane.getAttribute("position"));
      geometry.setAttribute("uv", plane.getAttribute("uv"));
      geometry.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 3));
      geometry.setAttribute("aRandom", new THREE.InstancedBufferAttribute(randoms, 1));
      geometry.instanceCount = count;

      mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      scene.add(mesh);
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      worldWidth = worldHeight * (width / height);
      camera.left = -worldWidth / 2;
      camera.right = worldWidth / 2;
      camera.top = worldHeight / 2;
      camera.bottom = -worldHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      createField();
      renderer.render(scene, camera);
    };

    const render = (timestamp: number) => {
      const delta = Math.min((timestamp - lastTime) / 16.67, 2);
      lastTime = timestamp;
      uniforms.uTime.value = timestamp / 1000;
      previousMouse.copy(uniforms.uMouse.value);
      uniforms.uMouse.value.lerp(targetMouse, 1 - Math.pow(0.945, delta));
      instantaneousVelocity.copy(uniforms.uMouse.value).sub(previousMouse).multiplyScalar(12);
      smoothedVelocity.lerp(instantaneousVelocity, 0.12);
      uniforms.uMouseVelocity.value.copy(smoothedVelocity);
      renderer.render(scene, camera);
      if (!reducedMotion && !document.hidden) frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetMouse.set(
        (event.clientX / window.innerWidth - 0.5) * worldWidth,
        -(event.clientY / window.innerHeight - 0.5) * worldHeight,
      );
    };
    const onPointerLeave = () => targetMouse.set(0, 0);
    const onVisibilityChange = () => {
      cancelAnimationFrame(frame);
      lastTime = performance.now();
      if (!document.hidden && !reducedMotion) frame = requestAnimationFrame(render);
    };

    resize();
    if (reducedMotion) renderer.render(scene, camera);
    else frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (mesh) mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}

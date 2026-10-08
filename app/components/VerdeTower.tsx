"use client";

import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import * as THREE from "three";

/* =========================================================================
   VERDE TOWER — procedural 4-tier hydroponic grow tower.

   Ported from the supplied standalone Three.js scene (model1.html) into R3F
   and re-lit for the dark site: graphite + steel hardware, emerald grow bars,
   no daylight studio floor. Nothing is loaded from disk — every shelf, net
   pot, lettuce leaf and water droplet is generated in code.
   ========================================================================= */

type Quality = "high" | "medium";

interface TowerBuild {
  group: THREE.Group;
  glowMat: THREE.MeshStandardMaterial;
  growLights: THREE.PointLight[];
  droplets: THREE.Mesh[];
  pipeCurve: THREE.CatmullRomCurve3;
  plants: { plant: THREE.Group; phase: number }[];
  dispose: () => void;
}

function buildTower(quality: Quality): TowerBuild {
  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];

  const track = <T extends { dispose: () => void }>(o: T) => {
    disposables.push(o);
    return o;
  };

  /* ---------------- materials — dark re-theme ---------------- */
  const graphite = track(
    new THREE.MeshStandardMaterial({ color: 0x1b2120, metalness: 0.82, roughness: 0.42 })
  );
  const graphiteDeep = track(
    new THREE.MeshStandardMaterial({ color: 0x0d1211, metalness: 0.4, roughness: 0.6 })
  );
  const shell = track(
    new THREE.MeshStandardMaterial({ color: 0x29332f, metalness: 0.28, roughness: 0.46 })
  );
  const tray = track(
    new THREE.MeshStandardMaterial({ color: 0x323d38, metalness: 0.42, roughness: 0.38 })
  );
  const steel = track(
    new THREE.MeshStandardMaterial({ color: 0x8e9c96, metalness: 0.9, roughness: 0.28 })
  );
  const soil = track(new THREE.MeshStandardMaterial({ color: 0x1a241a, roughness: 1 }));
  const glowMat = track(
    new THREE.MeshStandardMaterial({
      color: 0xbcffd0,
      emissive: 0x3ddc86,
      emissiveIntensity: 0.9,
      roughness: 0.3,
    })
  );
  const glassMat = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xbdf5e4,
      transparent: true,
      opacity: 0.3,
      roughness: 0.07,
      metalness: 0,
      transmission: 0.5,
      thickness: 0.04,
    })
  );
  const waterMat = track(
    new THREE.MeshStandardMaterial({
      color: 0x3fd9a4,
      emissive: 0x0f7a56,
      transparent: true,
      opacity: 0.55,
      roughness: 0.2,
    })
  );

  /* ---------------- primitive helpers ---------------- */
  const box = (
    w: number,
    h: number,
    d: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    r = 0.015
  ) => {
    const geo = r
      ? track(new RoundedBoxGeometry(w, h, d, 2, r))
      : track(new THREE.BoxGeometry(w, h, d));
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };

  const cyl = (
    rt: number,
    rb: number,
    h: number,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    segments = 24
  ) => {
    const mesh = new THREE.Mesh(track(new THREE.CylinderGeometry(rt, rb, h, segments)), mat);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };

  const tube = (pts: [number, number, number][], r: number, mat: THREE.Material, seg = 64) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const mesh = new THREE.Mesh(track(new THREE.TubeGeometry(curve, seg, r, 8, false)), mat);
    group.add(mesh);
    return { mesh, curve };
  };

  /* ---------------- base reservoir ---------------- */
  box(2.58, 0.58, 0.94, shell, 0, 0.34, 0, 0.075);
  box(2.48, 0.028, 0.86, tray, 0, 0.636, 0, 0.025);
  box(2.44, 0.032, 0.82, shell, 0, 0.659, 0, 0.02);
  for (const x of [-1.12, 1.12])
    for (const z of [-0.32, 0.32]) box(0.14, 0.075, 0.14, graphiteDeep, x, 0.04, z, 0.025);
  box(0.4, 0.038, 0.16, shell, -0.83, 0.688, 0.13, 0.025);
  cyl(0.09, 0.09, 0.025, tray, -0.83, 0.711, 0.13);
  box(0.39, 0.075, 0.011, steel, 0, 0.345, 0.475, 0.012);

  /* ---------------- etched wordmark on the base ---------------- */
  {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#121a17";
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = "#6ee7a8";
    ctx.font = "500 48px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("V E R D E", 256, 58);
    ctx.font = "18px ui-monospace, monospace";
    ctx.fillStyle = "#4b7a63";
    ctx.fillText("T O W E R   0 1", 256, 95);
    const tex = track(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    const logo = new THREE.Mesh(
      track(new THREE.PlaneGeometry(0.36, 0.09)),
      track(new THREE.MeshBasicMaterial({ map: tex }))
    );
    logo.position.set(0, 0.345, 0.483);
    group.add(logo);
  }

  /* ---------------- uprights + crown ---------------- */
  for (const x of [-1.3, 1.3]) {
    for (const z of [-0.31, 0.31]) {
      box(0.073, 3.84, 0.073, graphite, x, 2.54, z, 0.012);
      box(0.014, 3.73, 0.006, graphiteDeep, x + 0.022, 2.54, z + 0.039, 0.001);
    }
    box(0.073, 0.072, 0.7, graphite, x, 4.425, 0, 0.01);
    box(0.073, 0.072, 0.7, graphite, x, 0.78, 0, 0.01);
  }
  box(2.66, 0.075, 0.073, graphite, 0, 4.425, -0.31, 0.012);
  box(2.66, 0.06, 0.073, graphite, 0, 4.425, 0.31, 0.012);

  /* ---------------- lettuce ---------------- */
  let seed = 12;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const leafMaterials = [0x4e8f34, 0x5da03c, 0x42812c, 0x69ab45, 0x4a8a30].map((c) =>
    track(new THREE.MeshStandardMaterial({ color: c, roughness: 0.74, side: THREE.DoubleSide }))
  );
  const veinMat = track(new THREE.MeshStandardMaterial({ color: 0x8fc866, roughness: 0.9 }));

  const leafGeometry = (length: number, width: number, curl: number, phase: number) => {
    const rows = quality === "high" ? 13 : 8;
    const cols = quality === "high" ? 8 : 5;
    const verts: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    for (let j = 0; j <= rows; j++) {
      const t = j / rows;
      const breadth =
        Math.pow(Math.sin(Math.PI * t), 0.7) * width * (0.89 + 0.11 * Math.sin(t * 22 + phase));
      for (let i = 0; i <= cols; i++) {
        const u = (i / cols) * 2 - 1;
        const ripple =
          Math.sin(t * 27 + phase + Math.abs(u) * 2) *
          0.012 *
          Math.pow(Math.abs(u), 3) *
          Math.sin(Math.PI * t);
        verts.push(
          u * breadth,
          t * length,
          curl * t * t + Math.pow(Math.abs(u), 1.7) * 0.046 * Math.sin(Math.PI * t) + ripple
        );
        uvs.push(i / cols, t);
        if (j < rows && i < cols) {
          const a = j * (cols + 1) + i;
          const b = a + cols + 1;
          indices.push(a, b, a + 1, b, b + 1, a + 1);
        }
      }
    }
    const g = track(new THREE.BufferGeometry());
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  };

  const plants: { plant: THREE.Group; phase: number }[] = [];
  const leafCount = quality === "high" ? 10 : 6;

  const lettuce = (x: number, y: number, z: number) => {
    const plant = new THREE.Group();
    plant.position.set(x, y, z);
    group.add(plant);
    const variation = random();
    for (let i = 0; i < leafCount; i++) {
      const inner = i >= Math.round(leafCount * 0.7);
      const length = inner ? 0.14 + random() * 0.08 : 0.2 + random() * 0.085;
      const width = inner ? 0.045 : 0.065 + random() * 0.02;
      const curl = inner ? 0.025 : 0.055 + random() * 0.035;
      const leaf = new THREE.Mesh(
        leafGeometry(length, width, curl, random() * 6),
        leafMaterials[Math.floor(random() * leafMaterials.length)]
      );
      const pivot = new THREE.Group();
      pivot.rotation.y = i * 2.399 + variation * 4;
      pivot.rotation.x = inner ? 0.15 + random() * 0.2 : 0.48 + random() * 0.37;
      pivot.add(leaf);
      plant.add(pivot);
      if (quality === "high") {
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.01, 0.001),
          new THREE.Vector3(0, length * 0.45, curl * 0.2025 + 0.002),
          new THREE.Vector3(0, length * 0.89, curl * 0.792 + 0.002),
        ]);
        pivot.add(new THREE.Mesh(track(new THREE.TubeGeometry(path, 8, 0.0014, 4, false)), veinMat));
      }
    }
    plants.push({ plant, phase: random() * Math.PI * 2 });
  };

  /* ---------------- shelves ---------------- */
  const growLights: THREE.PointLight[] = [];
  const shelfYs = [0.99, 1.88, 2.77, 3.66];

  for (const y of shelfYs) {
    box(2.64, 0.102, 0.75, graphite, 0, y, 0, 0.018);
    box(2.49, 0.024, 0.65, tray, 0, y + 0.063, 0, 0.018);
    box(2.38, 0.012, 0.56, shell, 0, y + 0.077, 0, 0.014);

    for (const z of [-0.275, 0.275]) {
      box(2.39, 0.029, 0.041, steel, 0, y - 0.064, z, 0.005);
      box(2.32, 0.016, 0.027, glowMat, 0, y - 0.084, z, 0.004);
    }

    const light = new THREE.PointLight(0x7dffb8, 0.45, 1.25, 2);
    light.position.set(0, y - 0.16, 0);
    group.add(light);
    growLights.push(light);

    for (let i = 0; i < 5; i++) {
      const x = (i - 2) * 0.475;
      cyl(0.124, 0.087, 0.164, shell, x, y + 0.17, 0);
      const rim = new THREE.Mesh(track(new THREE.TorusGeometry(0.122, 0.013, 6, 28)), shell);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x, y + 0.25, 0);
      group.add(rim);
      cyl(0.109, 0.109, 0.012, soil, x, y + 0.244, 0);

      if (quality === "high") {
        for (let k = 0; k < 12; k++) {
          const a = (k * Math.PI) / 6;
          const slot = box(
            0.013,
            0.069,
            0.003,
            graphiteDeep,
            x + Math.sin(a) * 0.112,
            y + 0.174,
            Math.cos(a) * 0.112,
            0.003
          );
          slot.rotation.y = a;
          slot.rotation.x = -Math.sin(a) * 0.08;
        }
      }
      lettuce(x, y + 0.25, 0);
    }

    for (const x of [-1.24, 1.24])
      for (const z of [-0.34, 0.34]) {
        const bolt = new THREE.Mesh(
          track(new THREE.CylinderGeometry(0.016, 0.016, 0.009, 10)),
          steel
        );
        bolt.rotation.x = Math.PI / 2;
        bolt.position.set(x, y, z + (z > 0 ? 0.044 : -0.044));
        group.add(bolt);
      }
  }

  /* canopy bar over the top tier */
  box(2.42, 0.045, 0.12, graphite, 0, 4.419, 0, 0.008);
  box(2.33, 0.013, 0.076, glowMat, 0, 4.386, 0, 0.004);
  const canopyLight = new THREE.PointLight(0x7dffb8, 0.5, 1.2, 2);
  canopyLight.position.set(0, 4.3, 0);
  group.add(canopyLight);
  growLights.push(canopyLight);

  /* ---------------- plumbing ---------------- */
  const pipePoints: [number, number, number][] = [
    [1.05, 0.67, -0.1],
    [1.4, 0.79, -0.1],
    [1.43, 1.03, -0.1],
    [1.43, 3.94, -0.1],
    [1.38, 4.24, -0.1],
    [1.21, 4.28, -0.1],
  ];
  const pipe = tube(pipePoints, 0.032, glassMat, 72);
  tube(pipePoints, 0.018, waterMat, 72);

  for (const y of [1.15, 2.32, 3.53]) {
    box(0.16, 0.035, 0.077, graphite, 1.36, y, -0.1, 0.007);
    const clip = new THREE.Mesh(track(new THREE.TorusGeometry(0.037, 0.005, 6, 16)), steel);
    clip.position.set(1.43, y, -0.1);
    clip.rotation.x = Math.PI / 2;
    group.add(clip);
  }
  for (const y of shelfYs) {
    tube(
      [
        [1.42, y + 0.03, -0.1],
        [1.3, y + 0.03, -0.1],
        [1.18, y + 0.03, -0.1],
      ],
      0.016,
      glassMat,
      10
    );
  }

  const droplets: THREE.Mesh[] = [];
  const dropletGeo = track(new THREE.SphereGeometry(0.014, 8, 6));
  const dropletMat = track(
    new THREE.MeshBasicMaterial({ color: 0x8affd4, transparent: true, opacity: 0.55 })
  );
  for (let i = 0; i < 14; i++) {
    const m = new THREE.Mesh(dropletGeo, dropletMat);
    group.add(m);
    droplets.push(m);
  }

  /* ---------------- control box ---------------- */
  box(0.11, 0.21, 0.31, graphite, 1.35, 2.33, 0.18, 0.012);
  box(0.38, 0.43, 0.155, shell, 1.43, 2.34, 0.41, 0.035);
  box(0.303, 0.18, 0.008, graphiteDeep, 1.43, 2.407, 0.491, 0.014);

  {
    const c = document.createElement("canvas");
    c.width = 384;
    c.height = 192;
    const dc = c.getContext("2d")!;
    dc.fillStyle = "#07140f";
    dc.fillRect(0, 0, 384, 192);
    dc.fillStyle = "#4ade80";
    dc.font = "18px ui-monospace, monospace";
    dc.fillText("VERDE / GROW SYSTEM", 20, 30);
    dc.font = "50px ui-monospace, monospace";
    dc.fillStyle = "#d8ffe8";
    dc.fillText("21.4\u00b0", 20, 95);
    dc.font = "18px ui-monospace, monospace";
    dc.fillStyle = "#4ade80";
    dc.fillText("pH 6.2   FLOW OK", 20, 133);
    dc.fillStyle = "#22c55e";
    dc.fillRect(20, 155, 285, 5);
    const tex = track(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    const display = new THREE.Mesh(
      track(new THREE.PlaneGeometry(0.267, 0.137)),
      track(new THREE.MeshBasicMaterial({ map: tex }))
    );
    display.position.set(1.43, 2.407, 0.497);
    group.add(display);
  }

  const statusMat = track(
    new THREE.MeshStandardMaterial({ color: 0x8dffb0, emissive: 0x22c55e, emissiveIntensity: 0.9 })
  );
  for (let i = 0; i < 3; i++) {
    const led = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.012, 10, 8)),
      i === 0
        ? statusMat
        : track(
            new THREE.MeshStandardMaterial({
              color: i === 1 ? 0xa8d4b8 : 0xbfc7c2,
              emissive: i === 1 ? 0x2dd4bf : 0x000000,
              emissiveIntensity: 1.2,
            })
          )
    );
    led.position.set(1.355 + i * 0.061, 2.252, 0.492);
    group.add(led);
  }

  const button = new THREE.Mesh(
    track(new THREE.CylinderGeometry(0.022, 0.022, 0.008, 18)),
    steel
  );
  button.rotation.x = Math.PI / 2;
  button.position.set(1.54, 2.252, 0.493);
  group.add(button);
  box(0.13, 0.004, 0.02, tray, 1.43, 2.174, 0.485, 0.001);
  tube(
    [
      [1.43, 2.16, 0.38],
      [1.38, 2.06, 0.31],
      [1.3, 1.96, 0.29],
      [1.3, 0.8, 0.29],
    ],
    0.012,
    graphiteDeep,
    32
  );

  /* centre the tower on origin so it rotates about its own axis */
  group.position.y = -2.2;

  return {
    group,
    glowMat,
    growLights,
    droplets,
    pipeCurve: pipe.curve,
    plants,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

/* ========================================================================= */

function Tower({ quality }: { quality: Quality }) {
  const build = useMemo(() => buildTower(quality), [quality]);
  const pivot = useRef<THREE.Group>(null);
  const shift = useRef<THREE.Group>(null);
  const { pointer, camera, size } = useThree();

  useEffect(() => () => build.dispose(), [build]);

  /* Frame the tower so it never sits behind the headline and never crops.
     Wide screens: parked right of centre. Narrow: centred, small, far back. */
  useEffect(() => {
    const wide = size.width >= 1024;
    const aspect = size.width / size.height;

    // pull back far enough that the full 4.5-unit height fits with margin
    const dist = wide ? 15.5 : THREE.MathUtils.clamp(17 / Math.max(aspect, 0.5), 17, 30);
    camera.position.set(dist * 0.55, dist * 0.16, dist * 0.82);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    if (!shift.current) return;
    // offset along the camera's right axis so it moves sideways on screen, not diagonally
    const right = new THREE.Vector3();
    camera.getWorldDirection(right).cross(camera.up).normalize();
    const offset = wide ? 3.4 : 0;
    shift.current.position.copy(right.multiplyScalar(offset));
    shift.current.scale.setScalar(wide ? 0.95 : 0.78);
  }, [camera, size]);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    if (pivot.current) {
      // slow idle turntable, nudged by the pointer
      pivot.current.rotation.y += delta * 0.12;
      const targetX = -pointer.y * 0.1;
      pivot.current.rotation.x += (targetX - pivot.current.rotation.x) * (1 - Math.pow(0.002, delta));
    }

    // grow bars breathe
    const pulse = 0.85 + Math.sin(t * 0.8) * 0.18;
    build.glowMat.emissiveIntensity = pulse;
    build.growLights.forEach((l, i) => (l.intensity = (i === 4 ? 0.5 : 0.45) * (pulse / 0.85)));

    // nutrient flow
    build.droplets.forEach((d, i) => {
      d.position.copy(build.pipeCurve.getPointAt((i / 14 + t * 0.12) % 1));
      d.position.y -= 2.2;
    });

    // leaves sway
    build.plants.forEach(({ plant, phase }) => {
      plant.rotation.z = Math.sin(t * 0.7 + phase) * 0.014;
      plant.rotation.x = Math.cos(t * 0.55 + phase) * 0.008;
    });
  });

  return (
    <group ref={shift}>
      <group ref={pivot}>
        <primitive object={build.group} />
      </group>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <hemisphereLight args={[0xcfe8dd, 0x070c0b, 0.45]} />
      <directionalLight position={[-4.5, 8, 6]} intensity={1.15} color={0xf2fbf6} />
      <directionalLight position={[6, 3, -4]} intensity={0.5} color={0xa8d8cc} />
      <directionalLight position={[-3, 2, -6]} intensity={0.55} color={0x4ade80} />
    </>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function VerdeTower({ quality = "high" }: { quality?: Quality }) {
  return (
    <ErrorBoundary>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.55]">
        <Canvas
          camera={{ position: [8.5, 2.5, 12.7], fov: 34 }}
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.95,
          }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Lighting />
            <Tower quality={quality} />
          </Suspense>
        </Canvas>
        {/* keep the headline column legible over the model */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_38%,rgba(0,0,0,0.25)_62%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent" />
      </div>
    </ErrorBoundary>
  );
}

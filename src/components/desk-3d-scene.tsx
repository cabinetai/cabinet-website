"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Edges, PerspectiveCamera, RoundedBox, useTexture } from "@react-three/drei";
import { ResizeObserver } from "@juggle/resize-observer";
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { cubicBezier, motion, useTransform, type MotionValue } from "framer-motion";
import * as THREE from "three";

type Desk3DSceneProps = {
  progress: MotionValue<number>;
};

const DESK_X = -0.65;
const FALLBACK_MATRIX_IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const FALLBACK_MATRIX_FINAL = [
  0.665588512, -0.007722458, 0, 0.00014807,
  0.048285206, 0.119651601, 0, -0.000170956,
  0, 0, 1, 0,
  240, 235, 0, 1,
];

function smoothstep(min: number, max: number, value: number) {
  const x = THREE.MathUtils.clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

function fallbackMatrixAt(progress: number) {
  return FALLBACK_MATRIX_IDENTITY.map((start, index) =>
    THREE.MathUtils.lerp(start, FALLBACK_MATRIX_FINAL[index], progress)
  );
}

function projectFallbackPoint(matrix: number[], x: number, y: number) {
  const denominator = matrix[3] * x + matrix[7] * y + matrix[15];
  return {
    x: (matrix[0] * x + matrix[4] * y + matrix[12]) / denominator,
    y: (matrix[1] * x + matrix[5] * y + matrix[13]) / denominator,
  };
}

function fallbackDeskCornersAt(progress: number) {
  const matrix = fallbackMatrixAt(progress);

  return {
    topLeft: projectFallbackPoint(matrix, 0, 0),
    topRight: projectFallbackPoint(matrix, 1600, 0),
    bottomRight: projectFallbackPoint(matrix, 1600, 900),
    bottomLeft: projectFallbackPoint(matrix, 0, 900),
  };
}

function useLightWoodTexture() {
  const sourceTexture = useTexture("/textures/light-wood-desktop.webp");

  return useMemo(() => {
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [sourceTexture]);
}

function CameraRig({
  progress,
  cameraRef,
}: Desk3DSceneProps & { cameraRef: RefObject<THREE.PerspectiveCamera | null> }) {
  const { pointer } = useThree();
  const positionCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(DESK_X, 7.55, 0.025),
        new THREE.Vector3(0.45, 8.55, 3.8),
        new THREE.Vector3(4.8, 6.75, 7.35),
        new THREE.Vector3(7.55, 4.85, 8.3),
      ]),
    []
  );
  const targetCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(DESK_X, 2.92, 0),
        new THREE.Vector3(DESK_X, 2.62, 0),
        new THREE.Vector3(-0.1, 1.95, 0),
        new THREE.Vector3(0.35, 1.5, 0),
      ]),
    []
  );
  const desiredPosition = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const desiredUp = useRef(new THREE.Vector3());
  const overheadUp = useMemo(() => new THREE.Vector3(0, 0, -1), []);
  const standingUp = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    if (!camera) return;
    const raw = progress.get();
    const orbit = smoothstep(0.18, 0.56, raw);
    positionCurve.getPoint(orbit, desiredPosition.current);
    targetCurve.getPoint(orbit, desiredTarget.current);

    const pointerStrength = 0.08 + orbit * 0.12;
    desiredPosition.current.x += pointer.x * pointerStrength;
    desiredPosition.current.y += pointer.y * pointerStrength * 0.45;

    const alpha = 1 - Math.exp(-delta * 9);
    camera.position.lerp(desiredPosition.current, alpha);
    desiredUp.current
      .copy(overheadUp)
      .lerp(standingUp, smoothstep(0.02, 0.7, orbit))
      .normalize();
    camera.up.lerp(desiredUp.current, alpha).normalize();
    camera.lookAt(desiredTarget.current);

    const nextFov = THREE.MathUtils.lerp(35, 31, orbit);
    if (Math.abs(camera.fov - nextFov) > 0.01) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

function BambooMaterial({ texture, color = "#fffdfa" }: { texture: THREE.Texture | null; color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      map={texture ?? undefined}
      roughness={0.68}
      metalness={0.02}
      envMapIntensity={0.25}
    />
  );
}

function Desk() {
  const texture = useLightWoodTexture();
  const legPositions: [number, number, number][] = [
    [-2.78, 1.42, -1.1],
    [2.78, 1.42, -1.1],
    [-2.78, 1.42, 1.1],
    [2.78, 1.42, 1.1],
  ];

  return (
    <group position={[DESK_X, 0, 0]}>
      <RoundedBox
        args={[6.25, 0.24, 2.82]}
        radius={0.19}
        smoothness={10}
        position={[0, 2.96, 0]}
        castShadow
        receiveShadow
      >
        <BambooMaterial texture={texture} />
        <Edges color="#9b6b38" threshold={28} opacity={0.35} transparent />
      </RoundedBox>

      <RoundedBox
        args={[5.76, 0.12, 2.32]}
        radius={0.08}
        smoothness={7}
        position={[0, 2.79, 0]}
        castShadow
      >
        <meshStandardMaterial color="#b98243" roughness={0.72} />
      </RoundedBox>

      {legPositions.map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.15, 0.105, 2.84, 32]} />
            <BambooMaterial texture={null} color="#d6a467" />
          </mesh>
          <mesh position={[0, -1.435, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.035, 28]} />
            <meshStandardMaterial color="#5b5046" roughness={0.65} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function VanishingProp({
  progress,
  start,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const initial = useMemo(() => new THREE.Vector3(...position), [position]);
  const target = useMemo(() => new THREE.Vector3(DESK_X, 3.12, 0), []);

  useFrame(() => {
    const node = group.current;
    if (!node) return;
    const t = smoothstep(start, start + 0.115, progress.get());
    node.visible = t < 0.997;
    node.position.copy(initial).lerp(target, t);
    node.position.y += Math.sin(t * Math.PI) * 0.42;
    node.rotation.set(
      rotation[0] + t * 0.45,
      rotation[1] + t * Math.PI * 2.15,
      rotation[2] - t * 0.35
    );
    const size = Math.max(0.001, (1 - t ** 1.35) * scale);
    node.scale.setScalar(size);
  });

  return <group ref={group}>{children}</group>;
}

function Notebook() {
  return (
    <group>
      <RoundedBox args={[1.65, 0.08, 1.12]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color="#b36d3f" roughness={0.86} />
      </RoundedBox>
      <RoundedBox args={[1.55, 0.055, 1.02]} radius={0.035} smoothness={4} position={[0, 0.07, 0]}>
        <meshStandardMaterial color="#f2eadc" roughness={0.9} />
      </RoundedBox>
      <mesh position={[-0.7, 0.11, 0]} castShadow>
        <boxGeometry args={[0.045, 0.035, 1]} />
        <meshStandardMaterial color="#3e332b" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Laptop() {
  return (
    <group>
      <RoundedBox args={[1.9, 0.08, 1.28]} radius={0.07} smoothness={6} castShadow>
        <meshStandardMaterial color="#d7d4ce" roughness={0.38} metalness={0.36} />
      </RoundedBox>
      <RoundedBox
        args={[1.84, 1.12, 0.075]}
        radius={0.065}
        smoothness={6}
        position={[0, 0.58, -0.59]}
        rotation={[-0.2, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#d8d5cf" roughness={0.34} metalness={0.38} />
      </RoundedBox>
      <RoundedBox
        args={[1.68, 0.96, 0.02]}
        radius={0.04}
        smoothness={5}
        position={[0, 0.58, -0.535]}
        rotation={[-0.2, 0, 0]}
      >
        <meshStandardMaterial color="#2f3937" roughness={0.5} />
      </RoundedBox>
    </group>
  );
}

function Coffee() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.31, 0.25, 0.38, 32]} />
        <meshStandardMaterial color="#eee5d8" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.205, 0]}>
        <cylinderGeometry args={[0.255, 0.255, 0.018, 32]} />
        <meshStandardMaterial color="#6a3d24" roughness={0.9} />
      </mesh>
      <mesh position={[0.31, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.16, 0.045, 12, 28, Math.PI * 1.65]} />
        <meshStandardMaterial color="#eee5d8" roughness={0.82} />
      </mesh>
    </group>
  );
}

function Pen() {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.035, 0.035, 1.18, 18]} />
        <meshStandardMaterial color="#243337" roughness={0.42} metalness={0.22} />
      </mesh>
      <mesh position={[0, 0.64, 0]}>
        <coneGeometry args={[0.04, 0.15, 18]} />
        <meshStandardMaterial color="#c8a56a" roughness={0.35} metalness={0.5} />
      </mesh>
    </group>
  );
}

function DeskPlant() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.36, 0.28, 0.48, 28]} />
        <meshStandardMaterial color="#d9c4aa" roughness={0.86} />
      </mesh>
      {[[-0.12, 0.58, 0.02, -0.45], [0.14, 0.68, 0.04, 0.42], [0, 0.82, -0.03, 0.05]].map(
        ([x, y, z, rotate], index) => (
          <mesh key={index} position={[x, y, z]} rotation={[0.1, 0, rotate]} scale={[0.25, 0.5, 0.12]} castShadow>
            <sphereGeometry args={[1, 20, 12]} />
            <meshStandardMaterial color={index === 1 ? "#477443" : "#5d8850"} roughness={0.88} />
          </mesh>
        )
      )}
    </group>
  );
}

function DesktopAccessories({ progress }: Desk3DSceneProps) {
  return (
    <>
      <VanishingProp progress={progress} start={0.07} position={[-2.35, 3.16, 0.32]} rotation={[0, -0.12, 0]}>
        <Notebook />
      </VanishingProp>
      <VanishingProp
        progress={progress}
        start={0.105}
        position={[1.82, 3.16, 0.62]}
        rotation={[0, -0.08, 0]}
        scale={0.62}
      >
        <Laptop />
      </VanishingProp>
      <VanishingProp progress={progress} start={0.135} position={[1.52, 3.25, -0.82]} scale={0.7}>
        <Coffee />
      </VanishingProp>
      <VanishingProp
        progress={progress}
        start={0.155}
        position={[1.08, 3.15, 1.05]}
        rotation={[0, 0.2, 0.12]}
        scale={0.82}
      >
        <Pen />
      </VanishingProp>
      <VanishingProp
        progress={progress}
        start={0.09}
        position={[-0.35, 3.28, -0.82]}
        rotation={[0, 0.05, 0]}
        scale={0.7}
      >
        <DeskPlant />
      </VanishingProp>
    </>
  );
}

const FILE_COLORS = ["#d36e4f", "#e6a03f", "#d6c447", "#78a45d", "#5e9d92", "#6d8db6"];

function CabinetModel() {
  return (
    <group position={[3.34, 0, -0.08]} rotation={[0, -0.12, 0]} scale={0.9}>
      <RoundedBox args={[1.45, 1.7, 1.02]} radius={0.18} smoothness={7} position={[0, 0.88, -0.14]} castShadow>
        <meshStandardMaterial color="#d89978" roughness={0.72} />
      </RoundedBox>
      <RoundedBox args={[1.22, 0.5, 1.14]} radius={0.09} smoothness={6} position={[0, 1.18, 0.37]} castShadow>
        <meshStandardMaterial color="#edb38e" roughness={0.68} />
      </RoundedBox>
      <RoundedBox args={[1.22, 0.5, 1.2]} radius={0.09} smoothness={6} position={[0, 0.56, 0.44]} castShadow>
        <meshStandardMaterial color="#e6a782" roughness={0.7} />
      </RoundedBox>

      {FILE_COLORS.map((color, index) => (
        <RoundedBox
          key={color}
          args={[0.16, 0.43 + (index % 2) * 0.07, 0.055]}
          radius={0.025}
          smoothness={4}
          position={[-0.48 + index * 0.19, 1.58 + (index % 2) * 0.025, 0.92]}
          rotation={[0, 0, -0.05 + index * 0.018]}
          castShadow
        >
          <meshStandardMaterial color={color} roughness={0.8} />
        </RoundedBox>
      ))}

      {[0.56, 1.18].map((y) => (
        <group key={y} position={[0, y, 1.055]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.32, 20]} />
            <meshStandardMaterial color="#a87937" roughness={0.35} metalness={0.56} />
          </mesh>
          {[-0.16, 0.16].map((x) => (
            <mesh key={x} position={[x, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.026, 0.026, 0.12, 18]} />
              <meshStandardMaterial color="#a87937" roughness={0.35} metalness={0.56} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function FloorPlant() {
  const sourceTexture = useTexture("/generated/monstera-realistic.webp");
  const plantTexture = useMemo(() => {
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, [sourceTexture]);

  return (
    <group>
      <sprite position={[4.72, 1.78, -0.26]} scale={[2.3, 3.55, 1]}>
        <spriteMaterial
          map={plantTexture}
          transparent
          alphaTest={0.06}
          depthWrite={false}
          toneMapped
        />
      </sprite>
      <mesh position={[4.72, 0.012, -0.26]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 36]} />
        <meshBasicMaterial
          color="#6a5140"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene({ progress }: Desk3DSceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[DESK_X, 7.55, 0.025]}
        fov={35}
        near={0.1}
        far={60}
      />
      <CameraRig progress={progress} cameraRef={cameraRef} />
      <ambientLight intensity={1.15} color="#fff2d5" />
      <hemisphereLight args={["#fff6e8", "#8d6b51", 1.3]} />
      <directionalLight
        castShadow
        position={[-4, 10, 6]}
        intensity={3.1}
        color="#fff1d6"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={24}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={8}
        shadow-camera-bottom={-5}
        shadow-bias={-0.00012}
      />
      <directionalLight position={[7, 5, -4]} intensity={0.85} color="#bdcfe0" />

      <Desk />
      <DesktopAccessories progress={progress} />
      <CabinetModel />
      <FloorPlant />

      <mesh position={[0.8, -0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 22]} />
        <meshStandardMaterial color="#e9e1d7" roughness={0.96} />
      </mesh>
      <ContactShadows
        position={[0.8, 0.01, 0]}
        opacity={0.34}
        scale={20}
        blur={2.7}
        far={7}
        color="#6f5845"
      />
    </>
  );
}

function DeskSceneFallback({ progress }: Desk3DSceneProps) {
  const ease = cubicBezier(0.42, 0, 0.58, 1);
  const textureProgress = useTransform(progress, [0.16, 0.54], [0, 1], { ease });
  const textureTransform = useTransform(() => {
    const matrix = fallbackMatrixAt(textureProgress.get());
    return `matrix3d(${matrix.join(",")})`;
  });
  const textureRadius = useTransform(textureProgress, [0, 1], [0, 28]);
  const rearEdgePath = useTransform(() => {
    const transformed = textureProgress.get();
    const { topLeft, topRight } = fallbackDeskCornersAt(transformed);
    const depth = 9 * transformed;

    return [
      `M ${topLeft.x} ${topLeft.y}`,
      `L ${topRight.x} ${topRight.y}`,
      `L ${topRight.x - transformed} ${topRight.y + depth}`,
      `L ${topLeft.x + transformed} ${topLeft.y + depth}`,
      "Z",
    ].join(" ");
  });
  const leftEdgePath = useTransform(() => {
    const transformed = textureProgress.get();
    const { topLeft, bottomLeft } = fallbackDeskCornersAt(transformed);
    const rearDepth = 52 * transformed;
    const frontDepth = 64 * transformed;

    return [
      `M ${topLeft.x} ${topLeft.y}`,
      `L ${bottomLeft.x} ${bottomLeft.y}`,
      `L ${bottomLeft.x + transformed} ${bottomLeft.y + frontDepth}`,
      `L ${topLeft.x + 5 * transformed} ${topLeft.y + rearDepth}`,
      "Z",
    ].join(" ");
  });
  const rightEdgePath = useTransform(() => {
    const transformed = textureProgress.get();
    const { topRight, bottomRight } = fallbackDeskCornersAt(transformed);
    const rearDepth = 9 * transformed;
    const frontDepth = 17 * transformed;

    return [
      `M ${topRight.x} ${topRight.y}`,
      `L ${bottomRight.x} ${bottomRight.y}`,
      `L ${bottomRight.x - 2 * transformed} ${bottomRight.y + frontDepth}`,
      `L ${topRight.x - transformed} ${topRight.y + rearDepth}`,
      "Z",
    ].join(" ");
  });
  const frontEdgePath = useTransform(() => {
    const transformed = textureProgress.get();
    const { bottomLeft, bottomRight } = fallbackDeskCornersAt(transformed);
    const depth = 17 * transformed;

    return [
      `M ${bottomLeft.x} ${bottomLeft.y}`,
      `L ${bottomRight.x} ${bottomRight.y}`,
      `L ${bottomRight.x - 2 * transformed} ${bottomRight.y + depth}`,
      `L ${bottomLeft.x + transformed} ${bottomLeft.y + depth}`,
      "Z",
    ].join(" ");
  });
  const apronPath = useTransform(() => {
    const transformed = textureProgress.get();
    const { bottomLeft: left, bottomRight: right } = fallbackDeskCornersAt(transformed);
    const edgeDepth = 16 * transformed;
    const thickness = 48 * transformed;
    const topLeft = {
      x: left.x + transformed,
      y: left.y + edgeDepth,
    };
    const topRight = {
      x: right.x - 2 * transformed,
      y: right.y + edgeDepth,
    };
    const bottomRight = {
      x: topRight.x - 7 * transformed,
      y: topRight.y + thickness + 4 * transformed,
    };
    const bottomLeft = {
      x: topLeft.x,
      y: topLeft.y + thickness,
    };

    return [
      `M ${topLeft.x} ${topLeft.y}`,
      `L ${topRight.x} ${topRight.y}`,
      `L ${bottomRight.x} ${bottomRight.y}`,
      `Q ${bottomRight.x - 3 * transformed} ${bottomRight.y + 3 * transformed} ${bottomRight.x - 9 * transformed} ${bottomRight.y + 4 * transformed}`,
      `L ${bottomLeft.x + 8 * transformed} ${bottomLeft.y}`,
      `Q ${bottomLeft.x} ${bottomLeft.y} ${bottomLeft.x} ${bottomLeft.y - 8 * transformed}`,
      "Z",
    ].join(" ");
  });
  const frontLeftLeg = useTransform(
    progress,
    [0.27, 0.55],
    [
      "M 349 445 L 393 440 L 393 440 Q 371 440 349 445 Z",
      "M 349 445 L 393 440 L 374 786 Q 352 802 335 784 Z",
    ],
    { ease }
  );
  const frontRightLeg = useTransform(
    progress,
    [0.27, 0.55],
    [
      "M 1163 360 L 1207 355 L 1207 355 Q 1185 355 1163 360 Z",
      "M 1163 360 L 1207 355 L 1188 724 Q 1170 741 1153 724 Z",
    ],
    { ease }
  );
  const backLeftLeg = useTransform(
    progress,
    [0.29, 0.55],
    [
      "M 274 262 L 307 259 L 307 259 Q 291 259 274 262 Z",
      "M 274 262 L 307 259 L 291 662 Q 278 676 264 662 Z",
    ],
    { ease }
  );
  const backRightLeg = useTransform(
    progress,
    [0.29, 0.55],
    [
      "M 1012 204 L 1045 201 L 1045 201 Q 1029 201 1012 204 Z",
      "M 1012 204 L 1045 201 L 1038 675 Q 1023 688 1009 674 Z",
    ],
    { ease }
  );

  const propOpacity = useTransform(progress, [0.07, 0.12, 0.23], [1, 1, 0], { ease });
  const propScale = useTransform(progress, [0.08, 0.23], [1, 0.08], { ease });
  const propY = useTransform(progress, [0.08, 0.23], [0, -46], { ease });
  const propRotate = useTransform(progress, [0.08, 0.23], [0, -9], { ease });
  const roomGlowOpacity = useTransform(progress, [0.2, 0.5], [0, 1], { ease });
  const shadowOpacity = useTransform(progress, [0.28, 0.55], [0, 0.18], { ease });
  const shadowScale = useTransform(progress, [0.28, 0.55], [0.55, 1], { ease });
  const cabinetOpacity = useTransform(progress, [0.45, 0.53], [0, 1], { ease });
  const cabinetX = useTransform(progress, [0.43, 0.55], [180, 0], { ease });
  const cabinetY = useTransform(progress, [0.43, 0.55], [30, 0], { ease });
  const cabinetScale = useTransform(progress, [0.43, 0.55], [0.86, 1], { ease });
  const plantOpacity = useTransform(progress, [0.48, 0.56], [0, 1], { ease });
  const plantX = useTransform(progress, [0.46, 0.57], [150, 0], { ease });
  const plantY = useTransform(progress, [0.46, 0.57], [38, 0], { ease });
  const sceneOpacity = useTransform(progress, [0.63, 0.68], [1, 0]);

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_45%_24%,#fbf5ea_0%,#eee6dc_45%,#ded4c8_100%)]"
      style={{ opacity: sceneOpacity }}
    >
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="morph-room" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#faf6ef" />
            <stop offset="1" stopColor="#e5ddd3" />
          </linearGradient>
          <linearGradient id="morph-leg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b8793f" />
            <stop offset="0.48" stopColor="#dca96b" />
            <stop offset="1" stopColor="#9b5d2d" />
          </linearGradient>
          <linearGradient id="morph-left-edge" x1="0" y1="0" x2="1" y2="0.7">
            <stop offset="0" stopColor="#b87942" />
            <stop offset="0.72" stopColor="#c99057" />
            <stop offset="1" stopColor="#d3a068" />
          </linearGradient>
          <linearGradient id="morph-silver" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#f1efea" />
            <stop offset="1" stopColor="#b9b8b4" />
          </linearGradient>
          <filter id="morph-shadow" x="-35%" y="-80%" width="170%" height="260%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#morph-room)" />
        <motion.rect
          width="1600"
          height="900"
          fill="url(#morph-room)"
          style={{ opacity: roomGlowOpacity }}
        />
        <motion.ellipse
          cx="790"
          cy="760"
          rx="600"
          ry="82"
          fill="#69503d"
          filter="url(#morph-shadow)"
          style={{ opacity: shadowOpacity, scale: shadowScale, transformOrigin: "790px 760px" }}
        />

        <motion.path d={backLeftLeg} fill="url(#morph-leg)" opacity="0.82" />
        <motion.path d={backRightLeg} fill="url(#morph-leg)" opacity="0.84" />
        <motion.path d={frontLeftLeg} fill="url(#morph-leg)" />
        <motion.path d={frontRightLeg} fill="url(#morph-leg)" />

        <motion.path d={rearEdgePath} fill="#e2bc8b" stroke="#a97848" strokeOpacity="0.18" />
        <motion.path d={leftEdgePath} fill="url(#morph-left-edge)" stroke="#8f5a30" strokeOpacity="0.24" />
        <motion.path d={rightEdgePath} fill="#bd844d" stroke="#8e5d34" strokeOpacity="0.24" />
        <motion.path d={apronPath} fill="#c68f56" />
        <motion.path d={frontEdgePath} fill="#d8aa73" stroke="#9b6a3d" strokeOpacity="0.2" />
        <foreignObject x="0" y="0" width="1600" height="900" overflow="visible">
          <motion.div
            style={{
              width: 1600,
              height: 900,
              backgroundImage: "url('/textures/light-wood-desktop.webp')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: textureRadius,
              boxShadow: "inset 0 0 0 3px rgba(169,120,72,0.24)",
              transform: textureTransform,
              transformOrigin: "0 0",
              willChange: "transform",
            }}
          />
        </foreignObject>

        <motion.g
          style={{
            opacity: propOpacity,
            scale: propScale,
            y: propY,
            rotate: propRotate,
            transformBox: "view-box",
            transformOrigin: "1180px 430px",
          }}
        >
          <ellipse cx="1215" cy="864" rx="235" ry="30" fill="#5b3a24" fillOpacity="0.13" filter="url(#morph-shadow)" />
          <g transform="translate(1248 620) rotate(-5)">
            <path d="M0 24 L238 0 L276 129 L28 158 Z" fill="url(#morph-silver)" stroke="#9d9d98" strokeOpacity="0.42" strokeWidth="4" />
            <path d="M18 20 L225 0 L248 89 L36 111 Z" fill="#273431" />
            <path d="M28 158 L276 129 L302 155 L45 190 Z" fill="#dad8d3" stroke="#a9a8a3" strokeWidth="3" />
          </g>
          <g transform="translate(1426 45)">
            <ellipse cx="49" cy="64" rx="54" ry="58" fill="#f1ece2" />
            <ellipse cx="49" cy="62" rx="42" ry="43" fill="#865132" />
            <path d="M99 51 C137 48 139 94 101 100" fill="none" stroke="#f1ece2" strokeWidth="19" />
          </g>
          <g transform="translate(925 12)">
            <path d="M-46 68 L54 68 L38 150 Q4 172 -29 151 Z" fill="#ebe0ce" />
            <ellipse cx="2" cy="69" rx="51" ry="20" fill="#76583b" />
            <ellipse cx="-32" cy="43" rx="53" ry="25" fill="#59804c" transform="rotate(-23 -32 43)" />
            <ellipse cx="29" cy="34" rx="59" ry="28" fill="#6c9256" transform="rotate(18 29 34)" />
            <ellipse cx="4" cy="8" rx="55" ry="27" fill="#4d7544" />
          </g>
          <g transform="translate(1180 790) rotate(77)">
            <rect x="-7" y="-92" width="14" height="184" rx="7" fill="#263638" />
            <path d="M-7 -92 L0 -117 L7 -92 Z" fill="#bb8e4e" />
            <rect x="-7" y="45" width="14" height="30" fill="#caa161" />
          </g>
        </motion.g>

        <g transform="translate(68 512)">
          <motion.g
            style={{
              opacity: cabinetOpacity,
              x: cabinetX,
              y: cabinetY,
              scale: cabinetScale,
              transformBox: "fill-box",
              transformOrigin: "50% 100%",
            }}
          >
            <ellipse cx="99" cy="253" rx="128" ry="28" fill="#5d4031" fillOpacity="0.16" filter="url(#morph-shadow)" />
            <rect x="42" y="0" width="150" height="236" rx="28" fill="#d99775" />
            <rect x="0" y="54" width="164" height="75" rx="14" fill="#efb58f" />
            <rect x="-8" y="142" width="172" height="76" rx="14" fill="#e5a37e" />
            {["#d96f51", "#e5a13e", "#d8c84e", "#75a25a", "#5b9a8c", "#6d8fb8"].map(
              (color, index) => (
                <rect
                  key={color}
                  x={17 + index * 21}
                  y={25 - (index % 2) * 6}
                  width="16"
                  height={56 + (index % 2) * 6}
                  rx="4"
                  fill={color}
                />
              )
            )}
            <path d="M61 92 H102" stroke="#9c6d35" strokeWidth="8" strokeLinecap="round" />
            <path d="M56 180 H103" stroke="#9c6d35" strokeWidth="8" strokeLinecap="round" />
          </motion.g>
        </g>

        <g transform="translate(1400 410)">
          <motion.g
            style={{
              opacity: plantOpacity,
              x: plantX,
              y: plantY,
              transformBox: "fill-box",
              transformOrigin: "50% 100%",
            }}
          >
            <ellipse cx="5" cy="395" rx="105" ry="25" fill="#5d4031" fillOpacity="0.13" filter="url(#morph-shadow)" />
            <image
              href="/generated/monstera-realistic.webp"
              x="-145"
              y="-55"
              width="310"
              height="465"
              preserveAspectRatio="xMidYMid meet"
            />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}

type RendererState = "checking" | "available" | "unavailable";

export function Desk3DScene({ progress }: Desk3DSceneProps) {
  const [rendererState, setRendererState] = useState<RendererState>("checking");

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("renderer") === "vector"
    ) {
      const frame = window.requestAnimationFrame(() => setRendererState("unavailable"));
      return () => window.cancelAnimationFrame(frame);
    }

    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;

    try {
      const context = probe.getContext("webgl2", {
        alpha: true,
        antialias: false,
        depth: false,
        failIfMajorPerformanceCaveat: true,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
        stencil: false,
      });

      if (!context) {
        const frame = window.requestAnimationFrame(() => setRendererState("unavailable"));
        return () => window.cancelAnimationFrame(frame);
      }

      context.getExtension("WEBGL_lose_context")?.loseContext();
      const frame = window.requestAnimationFrame(() => setRendererState("available"));
      return () => window.cancelAnimationFrame(frame);
    } catch {
      const frame = window.requestAnimationFrame(() => setRendererState("unavailable"));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    if (rendererState !== "available") return;
    const frame = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
    const timer = window.setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 120);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [rendererState]);

  if (rendererState !== "available") {
    return <DeskSceneFallback progress={progress} />;
  }

  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(circle_at_45%_24%,#fbf5ea_0%,#eee6dc_45%,#ded4c8_100%)]"
    >
      <Canvas
        shadows="basic"
        dpr={[1, 1.75]}
        resize={{ polyfill: ResizeObserver }}
        camera={{ position: [DESK_X, 7.55, 0.025], fov: 35, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "auto" }}
      >
        <Scene progress={progress} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_55%,rgba(90,62,40,0.035))]" />
    </div>
  );
}

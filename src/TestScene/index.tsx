import React from "react";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Plane,
  Polyhedron,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

// start loading mesh immediately
useGLTF.preload("/apple.gltf");

const cam = new THREE.PerspectiveCamera(30, 1);
cam.position.set(0, 3.2, 7);

const canvasRef = React.createRef<HTMLCanvasElement>();
const cameraRef = React.createRef<THREE.PerspectiveCamera>();
const appleRef = React.createRef<THREE.Object3D>();
const planeRef = React.createRef<THREE.Object3D>();

// prettier-ignore
const verticesOfCube = [
  -1, -1, -1, 
   1, -1, -1, 
   1,  1, -1, 
  -1,  1, -1,
  -1, -1,  1, 
   1, -1,  1, 
   1,  1,  1, 
  -1,  1,  1,
];

// prettier-ignore
const indicesOfCubeFaces = [
  2, 1, 0, 0, 3, 2,
  0, 4, 7, 7, 3, 0,
  0, 1, 5, 5, 4, 0,
  1, 2, 6, 6, 5, 1,
  2, 3, 7, 7, 6, 2,
  4, 5, 6, 6, 7, 4
];

const CustomCube = () => (
  <Polyhedron
    args={[verticesOfCube, indicesOfCubeFaces]}
    position={[4, 0, 0]}
    scale={2.0}
  >
    <meshPhongMaterial attach="material" color="#ff7220" />
  </Polyhedron>
);

const Apple = React.forwardRef((props: MeshProps, ref) => {
  const { nodes, materials } = useGLTF("/apple.gltf");
  return (
    <group
      ref={ref}
      {...props}
      // TODO: what should go here?
      dispose={null}
    >
      <mesh geometry={nodes.appleobj.geometry} material={materials.apple} />
    </group>
  );
});

interface IXYPlaneProps {
  size: number;
}

const XYPlane = React.forwardRef(({ size }: IXYPlaneProps, ref) => (
  <Plane
    ref={ref}
    args={[size, size, size, size]}
    rotation={[0, 0, 0]}
    position={[0, 0, 0]}
  >
    <meshPhongMaterial attach="material" color="#80ffdb" wireframe />
  </Plane>
));

const HoverAppleScene: React.FC = () => {
  useFrame(({ clock }) => {
    const rotationSpeed = 200;

    // rotate apple on hover
    if (hovered && appleRef.current) {
      appleRef.current.rotation.y += clock.getDelta() * rotationSpeed;
    }
  });

  const [hovered, setHovered] = React.useState(false);

  return (
    <group>
      <XYPlane size={10} ref={planeRef} />
      <CustomCube />
      <Apple
        ref={appleRef}
        scale={20}
        position={[0, -1.18, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => setHovered(false)}
      />
    </group>
  );
};

export const TestScene: React.FC = () => {
  return (
    <div className="test-scene-container">
      <React.Suspense
        fallback={
          <div>
            <div>Loading...</div>
          </div>
        }
      >
        <Canvas ref={canvasRef}>
          <PerspectiveCamera
            position={[0, 1.2, 7]}
            fov={60}
            ref={cameraRef}
          ></PerspectiveCamera>
          <pointLight position={[-12, -12, 8]} intensity={112} />
          <ambientLight intensity={2} />
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.25}
            enablePan={false}
            minDistance={7}
            maxDistance={50}
            rotateSpeed={0.3}
          />
          <HoverAppleScene />
        </Canvas>
      </React.Suspense>
    </div>
  );
};

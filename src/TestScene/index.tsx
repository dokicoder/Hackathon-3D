import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Body } from './Body';

// start loading mesh immediately
useGLTF.preload("/apple.gltf");

export const TestScene: React.FC = () => {



  
const canvasRef = React.createRef<HTMLCanvasElement>();
const cameraRef = React.createRef<THREE.PerspectiveCamera>();

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
            ref={cameraRef} matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined}></PerspectiveCamera>
          <pointLight position={[-12, -12, 8]} intensity={112} />
          <ambientLight intensity={2} />
          <Body></Body>
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.25}
            enablePan={false}
            minDistance={7}
            maxDistance={50}
            rotateSpeed={0.3}
          />
          
        </Canvas>
       
      </React.Suspense>
    </div>
  );
};

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { Body } from './Body';

import { suspend } from 'suspend-react';

const studio = import('@pmndrs/assets/hdri/studio.exr' as any).then(
  (module) => module.default
);

export const TestScene: React.FC = () => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const cameraRef = React.createRef<THREE.PerspectiveCamera>();

  return (
    <React.Suspense
      fallback={
        <div className="loading-indicator">
          <div>Loading...</div>
        </div>
      }
    >
      <Canvas ref={canvasRef}>
        <Environment files={suspend(studio) as any} />
        <PerspectiveCamera
          position={[0, 1.2, 7]}
          fov={60}
          ref={cameraRef}
          matrixWorldAutoUpdate={undefined}
          getObjectsByProperty={undefined}
        />

        <Body></Body>
        <OrbitControls
          enableDamping={true}
          dampingFactor={0.25}
          enablePan={false}
          minDistance={3}
          maxDistance={100}
          rotateSpeed={0.3}
        />
      </Canvas>
    </React.Suspense>
  );
};

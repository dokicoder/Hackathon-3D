import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import bodyUrl from '../assets/female_base_mesh.glb?url';

useGLTF.preload(bodyUrl);

export const FemaleBody = () => {
  const { nodes, materials } = useGLTF(bodyUrl) as any;
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.material_0}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        position={[0, -5.9, 0]}
        scale={4}
      />
    </group>
  );
};

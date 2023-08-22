import { useGLTF } from '@react-three/drei';
import bodyUrl from '../assets/male_body.glb?url';
import { createRef, useState } from 'react';
import { Group, Vector3 } from 'three';

interface ISphereProps {
  position: Vector3;
}

const Sphere = ({ position }: ISphereProps) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.4, 24, 24]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  );
};

useGLTF.preload(bodyUrl);

export const Body = () => {
  const el = useGLTF(bodyUrl);
  const ref = createRef<Group>();

  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));

  return (
    <group ref={ref}>
      <mesh
        receiveShadow
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          console.log('enter', e);
        }}
        onPointerOut={(e) => {
          console.log('exit', e);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          console.log('move', e);

          setPosition(e.point);
        }}
      >
        <primitive object={el.scene} />;
      </mesh>
      <Sphere position={position} />
    </group>
  );
};

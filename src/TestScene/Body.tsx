import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { createRef } from "react";
import { Group } from "three";
import bodyUrl from "../assets/male_body.glb?url";

export const Body = () => {
  const el = useGLTF(bodyUrl);
  const ref = createRef<Group>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!ref.current) return;
    //ref.current?.rotation.set(0, t / 2, 0);
  });
  return (
    <group ref={ref}>
      <mesh receiveShadow castShadow>
        <primitive object={el.scene} />;
      </mesh>
    </group>
  );
};

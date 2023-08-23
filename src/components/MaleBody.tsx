import { useGLTF } from '@react-three/drei';
import bodyUrl from '../assets/male_body_separated.glb?url';

useGLTF.preload(bodyUrl);

export const MaleBody = () => {
  const { nodes, materials } = useGLTF(bodyUrl) as any;

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.arm_left_lower_back.geometry}
        material={materials.Body_low}
        userData={{ name: 'arm_left_lower_back' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.arm_left_lower_front.geometry}
        material={materials.Body_low}
        userData={{ name: 'arm_left_lower_front' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.arm_right_lower_back.geometry}
        material={materials.Body_low}
        userData={{ name: 'arm_right_lower_back' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.arm_right_lower_front.geometry}
        material={materials.Body_low}
        userData={{ name: 'arm_right_lower_front' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Body_low_Body_low_0.geometry}
        material={materials.Body_low}
        userData={{ name: 'body' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.face_front.geometry}
        material={materials.Body_low}
        userData={{ name: 'face_front' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.foot_left.geometry}
        material={materials.Body_low}
        userData={{ name: 'foot_left' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.foot_right.geometry}
        material={materials.Body_low}
        userData={{ name: 'foot_right' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hand_left.geometry}
        material={materials.Body_low}
        userData={{ name: 'hand_left' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.hand_right.geometry}
        material={materials.Body_low}
        userData={{ name: 'hand_right' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.EyeGlass_low_EyeGlass_low_0.geometry}
        material={materials.EyeGlass_low}
        userData={{ name: 'eyes' }}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Male_Basic_Male_Basic_0.geometry}
        material={materials.Male_Basic}
        userData={{ name: 'body' }}
      />
    </group>
  );
};

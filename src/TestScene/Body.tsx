import { useGLTF } from '@react-three/drei';
import { createRef, useState } from 'react';
import { Group, MeshBasicMaterial, Vector3 } from 'three';
import { MeshProps } from '@react-three/fiber';
import bodyUrl from '../assets/male_body_separated.glb?url';

interface ISphereProps extends MeshProps {
  opacity: number;
  color: string;
}

interface IWoundState {
  position: Vector3;
  toggled: boolean;
}

const Sphere = ({ opacity, color, ...rest }: ISphereProps) => {
  return (
    <mesh {...rest}>
      <sphereGeometry args={[0.2, 24, 24]} />
      <meshBasicMaterial transparent opacity={opacity} color={color} />
    </mesh>
  );
};

useGLTF.preload(bodyUrl);

export const Body = () => {
  const el = useGLTF(bodyUrl);
  const ref = createRef<Group>();

  console.log('Body', el);

  const selectionMaterial: MeshBasicMaterial = (
    el as any
  ).nodes.foot_left.material.clone();

  selectionMaterial.setValues({ color: '#ff6644' });

  (el as any).nodes.foot_left.material = selectionMaterial;
  (el as any).nodes.foot_right.material = selectionMaterial;
  (el as any).nodes.hand_left.material = selectionMaterial;
  (el as any).nodes.hand_right.material = selectionMaterial;

  const [previewPosition, setPreviewPosition] = useState<Vector3 | undefined>(
    new Vector3(0, 0, 0)
  );
  const [showPreview, setShowPreview] = useState(true);
  const [woundStates, setWoundStates] = useState<IWoundState[]>([]);

  return (
    <group ref={ref}>
      {/* BODY */}
      <mesh
        receiveShadow
        castShadow
        onPointerOut={(e) => {
          setPreviewPosition(undefined);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          setPreviewPosition(e.point);
        }}
        onPointerDown={(e) => {
          if (
            previewPosition &&
            woundStates.find((el) => el.toggled) === undefined
          ) {
            setWoundStates([
              ...woundStates,
              { position: previewPosition, toggled: true },
            ]);
          }
        }}
      >
        <primitive object={el.scene} />
      </mesh>
      {previewPosition && showPreview && (
        <Sphere position={previewPosition} color={'#ffaaaa'} opacity={0.5} />
      )}
      {woundStates.map(({ position, toggled }, idx) => (
        <Sphere
          position={position}
          color={toggled ? '#1166ff' : '#ff6644'}
          opacity={0.8}
          key={idx}
          onPointerMove={(e) => {
            e.stopPropagation();
            const newStates = [...woundStates];
            newStates[idx].toggled = true;
            setWoundStates(newStates);
            setPreviewPosition(e.point);
            setShowPreview(false);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            const newStates = [...woundStates];
            newStates[idx].toggled = false;
            setWoundStates(newStates);
            setPreviewPosition(e.point);
            setShowPreview(true);
          }}
        />
      ))}
    </group>
  );
};

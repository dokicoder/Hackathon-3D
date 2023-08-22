import { useGLTF } from '@react-three/drei';
import { createRef, useRef, useState } from 'react';
import {
  Group,
  Material,
  Mesh,
  MeshStandardMaterial,
  Skeleton,
  Vector3,
} from 'three';
import { MeshProps } from '@react-three/fiber';
import bodyUrl from '../assets/male_body_separated.glb?url';
import { useWoundDocStore } from '../store';

interface ISphereProps extends MeshProps {
  opacity: number;
  color: string;
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

  /*
  const selectionMaterial: MeshBasicMaterial = (
    el as any
  ).nodes.foot_left.material.clone();
  selectionMaterial.setValues({ color: '#ff6644' });
  (el as any).nodes.foot_left.material = selectionMaterial;
  (el as any).nodes.foot_right.material = selectionMaterial;
  (el as any).nodes.hand_left.material = selectionMaterial;
  (el as any).nodes.hand_right.material = selectionMaterial;
  */

  const [previewPosition, setPreviewPosition] = useState<Vector3 | undefined>(
    new Vector3(0, 0, 0)
  );
  const [showPreview, setShowPreview] = useState(true);

  const hoverMaterialRef = useRef<MeshStandardMaterial>();

  const { wounds, selectedWoundIdx, addWound, selectWound } =
    useWoundDocStore();

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
        onPointerUp={(e) => {
          if (previewPosition && selectedWoundIdx === undefined) {
            console.log(e.object.userData.name);

            addWound({
              position: previewPosition,
              bodyPart: e.object.userData.name,
            });
            selectWound(wounds.length);
          }
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          console.log(e);

          if (hoverMaterialRef.current) {
            hoverMaterialRef.current.dispose();
          }
          hoverMaterialRef.current = (e.object as Mesh)
            .material as MeshStandardMaterial;

          const coloredMaterial = (
            (e.object as Mesh).material as MeshStandardMaterial
          ).clone();

          coloredMaterial.setValues({ color: '#88bb88' });

          (e.object as Mesh).material = coloredMaterial;
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();

          if (hoverMaterialRef.current) {
            // TODO: this could go bad
            ((e.object as Mesh).material as Material).dispose();

            (e.object as Mesh).material = hoverMaterialRef.current;
          }
        }}
      >
        <primitive object={el.scene} />
      </mesh>
      {previewPosition && showPreview && (
        <Sphere position={previewPosition} color={'#ffaaaa'} opacity={0.5} />
      )}
      {wounds.map(({ position }, idx) => (
        <Sphere
          position={position}
          color={idx === selectedWoundIdx ? '#1166ff' : '#ff6644'}
          opacity={0.8}
          key={idx}
          onPointerMove={(e) => {
            e.stopPropagation();
            selectWound(idx);
            setPreviewPosition(e.point);
            setShowPreview(false);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            selectWound(undefined);
            setPreviewPosition(e.point);
            setShowPreview(true);
          }}
        />
      ))}
    </group>
  );
};

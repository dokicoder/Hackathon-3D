import { Html, useGLTF } from '@react-three/drei';
import { createRef, useRef, useState } from 'react';
import { Group, Material, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { MeshProps } from '@react-three/fiber';
import bodyUrl from '../assets/male_body_separated.glb?url';
import { useWoundDocStore } from '../store';
import { Card, CardContent } from '@mui/material';
import { Label } from '../components/Label';

interface ISphereProps extends MeshProps {
  opacity: number;
  color: string;
}

type Coordinates = {
  x: number;
  y: number;
};

const calculateDistance = (start: Coordinates, end: Coordinates): number => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  // Using the Euclidean distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

const selectedWoundColor = '#1166ff';
const hoveredWoundColor = '#66ff44';
const defaultWoundColor = '#ff6644';

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
  const { nodes, materials } = useGLTF(bodyUrl) as any;
  const ref = createRef<Group>();

  const [clickRef, setClickRef] = useState<Coordinates | null>(null);

  /*
  const el = useGLTF(bodyUrl);

  const selectionMaterial: MeshBasicMaterial = (
    el as any
  ).nodes.foot_left.material.clone();

  selectionMaterial.setValues({ color: "#ff6644" });

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

  const {
    wounds,
    selectedWoundIdx,
    selectedWound,
    hoveredWoundIdx,
    updateWound,
    addWound,
    setWoundHovered,
    selectWound,
  } = useWoundDocStore();

  return (
    <group ref={ref}>
      {/* BODY */}
      <mesh
        receiveShadow
        castShadow
        position={[0, 1, 0]}
        scale={0.9}
        onPointerOut={(e) => {
          setPreviewPosition(undefined);
        }}
        onPointerMove={(e) => {
          e.stopPropagation();
          setPreviewPosition(e.point);
        }}
        onPointerDown={(e) => {
          setClickRef({ x: e.clientX, y: e.clientY });
        }}
        onPointerUp={(e) => {
          e.stopPropagation();

          const mouseDistance = calculateDistance(
            { x: clickRef?.x ?? 0, y: clickRef?.y ?? 0 },
            { x: e.clientX, y: e.clientY }
          );

          if (mouseDistance > 20) {
            return;
          }

          if (previewPosition && hoveredWoundIdx === undefined) {
            if (selectedWoundIdx !== undefined && selectedWound) {
              updateWound(
                {
                  ...selectedWound,
                  position: previewPosition,
                  bodyPart: e.object.userData.name || 'body',
                },
                selectedWoundIdx
              );
            } else {
              console.log('addWound');
              addWound({
                position: previewPosition,
                bodyPart: e.object.userData.name || 'body',
              });
              selectWound(wounds.length);
            }
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
          setClickRef(null);
        }}
      >
        <group dispose={null}>
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
            userData={{ name: 'body' }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Male_Basic_Male_Basic_0.geometry}
            material={materials.Male_Basic}
            userData={{ name: 'body' }}
          />
        </group>
      </mesh>
      {previewPosition && showPreview && (
        <Sphere position={previewPosition} color={'#ffaaaa'} opacity={0.5} />
      )}
      {wounds.map((wound, idx) => (
        <>
          <Sphere
            position={wound.position}
            color={
              idx === selectedWoundIdx
                ? selectedWoundColor
                : idx === hoveredWoundIdx
                ? hoveredWoundColor
                : defaultWoundColor
            }
            opacity={0.8}
            key={idx}
            onPointerMove={(e) => {
              e.stopPropagation();
              setWoundHovered(idx);
              setPreviewPosition(e.point);
              setShowPreview(false);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setWoundHovered(undefined);
              setPreviewPosition(e.point);
              setShowPreview(true);
            }}
            onPointerUp={(e) => {
              selectWound(idx);
            }}
          ></Sphere>
          <Label wound={wound} />
        </>
      ))}
    </group>
  );
};

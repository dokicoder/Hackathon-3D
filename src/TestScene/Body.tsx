import { useGLTF } from '@react-three/drei';
import { createRef, useRef, useState } from 'react';
import { Group, Material, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { MeshProps } from '@react-three/fiber';

import { useWoundDocStore } from '../store';
import { Label } from '../components/Label';
import { MaleBody } from '../components/MaleBody';
import { FemaleBody } from '../components/FemaleBody';

interface ISphereProps extends MeshProps {
  opacity: number;
  color: string;
  radius: number;
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

const pointerColor = '#FDE66C';
const selectedWoundColor = '#FF7A00';
const hoveredWoundColor = '#FFB800';
const defaultWoundColor = '#ffe100';

const transformMarkerSize = (size: number) => (size / 100) * 0.5;

const Sphere = ({ opacity, color, radius, ...rest }: ISphereProps) => {
  return (
    <mesh {...rest}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial transparent opacity={opacity} color={color} />
    </mesh>
  );
};

export const Body = () => {
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
    selectedWound,
    hoveredWound,
    markerPreviewSize,
    showResizePreview,
    updateWound,
    addWound,
    setWoundHovered,
    selectWound,
    setHoveredBodyPart,
    gender,
  } = useWoundDocStore();

  return (
    <group ref={ref}>
      {/* BODY */}
      <mesh
        receiveShadow
        castShadow
        position={[0, 0.9, 0]}
        scale={0.8}
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

          if (previewPosition && hoveredWound === undefined) {
            if (selectedWound) {
              updateWound({
                ...selectedWound,
                position: previewPosition,
                bodyPart: e.object.userData.name || 'body',
              });
            } else {
              const id = addWound({
                position: previewPosition,
                bodyPart: e.object.userData.name || 'body',
                size: markerPreviewSize,
                appendedPictures: [],
              });
              selectWound(id);
            }
          }
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();

          if (hoverMaterialRef.current) {
            hoverMaterialRef.current.dispose();
          }
          hoverMaterialRef.current = (e.object as Mesh)
            .material as MeshStandardMaterial;

          const coloredMaterial = (
            (e.object as Mesh).material as MeshStandardMaterial
          ).clone();

          coloredMaterial.setValues({ color: '#6e6d6d' });

          setHoveredBodyPart(e.object.userData.name);

          (e.object as Mesh).material = coloredMaterial;
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();

          if (hoverMaterialRef.current) {
            // TODO: this could go bad
            ((e.object as Mesh).material as Material).dispose();

            (e.object as Mesh).material = hoverMaterialRef.current;
          }

          setHoveredBodyPart(undefined);

          setClickRef(null);
        }}
      >
        {gender === 'female' ? <FemaleBody /> : <MaleBody />}
      </mesh>
      {previewPosition && showPreview && (
        <Sphere
          position={previewPosition}
          radius={transformMarkerSize(markerPreviewSize)}
          color={pointerColor}
          opacity={0.5}
        />
      )}
      {showResizePreview && (
        <Sphere
          position={[-1, 2.3, 0.4]}
          radius={transformMarkerSize(markerPreviewSize)}
          color={pointerColor}
          opacity={1.0}
        />
      )}

      {wounds.map((wound, idx) => (
        <group key={idx}>
          <Sphere
            key={idx}
            position={wound.position}
            color={
              wound.id === selectedWound?.id
                ? selectedWoundColor
                : wound.id === hoveredWound?.id
                ? hoveredWoundColor
                : defaultWoundColor
            }
            radius={transformMarkerSize(wound.size)}
            opacity={0.8}
            onPointerMove={(e) => {
              e.stopPropagation();
              setWoundHovered(wound.id);
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
              selectWound(wound.id);
            }}
          />
          <Label wound={wound} />
        </group>
      ))}
    </group>
  );
};

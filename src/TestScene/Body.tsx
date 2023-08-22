import { useGLTF } from "@react-three/drei";
import { createRef, useState } from "react";
import { Group, MeshBasicMaterial, Vector3 } from "three";
import { MeshProps, ThreeEvent } from "@react-three/fiber";
import bodyUrl from "../assets/male_body_separated.glb?url";

interface ISphereProps extends MeshProps {
  opacity: number;
  color: string;
}

interface IWoundState {
  position: Vector3;
  toggled: boolean;
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

  const { nodes, materials } = useGLTF(bodyUrl) as any;
  const ref = createRef<Group>();
  const [clickRef, setClickRef] = useState<Coordinates | null>(null);

  const selectionMaterial: MeshBasicMaterial = (
    el as any
  ).nodes.foot_left.material.clone();

  selectionMaterial.setValues({ color: "#ff6644" });

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
          setClickRef({ x: e.clientX, y: e.clientY });
        }}
        onPointerUp={(e) => {
          console.log(
            "CD",
            calculateDistance(
              { x: clickRef?.x ?? 0, y: clickRef?.y ?? 0 },
              { x: e.clientX, y: e.clientY }
            )
          );
          if (
            calculateDistance(
              { x: clickRef?.x ?? 0, y: clickRef?.y ?? 0 },
              { x: e.clientX, y: e.clientY }
            ) < 20 &&
            previewPosition &&
            woundStates.find((el) => el.toggled) === undefined
          ) {
            setWoundStates([
              ...woundStates,
              { position: previewPosition, toggled: true },
            ]);
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
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.foot_left.geometry}
            material={materials.Body_low}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.foot_right.geometry}
            material={materials.Body_low}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hand_left.geometry}
            material={materials.Body_low}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hand_right.geometry}
            material={materials.Body_low}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.EyeGlass_low_EyeGlass_low_0.geometry}
            material={materials.EyeGlass_low}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Male_Basic_Male_Basic_0.geometry}
            material={materials.Male_Basic}
          />
        </group>
      </mesh>
      {previewPosition && showPreview && (
        <Sphere position={previewPosition} color={"#ffaaaa"} opacity={0.5} />
      )}
      {woundStates.map(({ position, toggled }, idx) => (
        <Sphere
          position={position}
          color={toggled ? "#1166ff" : "#ff6644"}
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

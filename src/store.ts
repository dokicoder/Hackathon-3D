import { Vector3 } from 'three';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export interface IWoundState {
  id: string;
  position: Vector3;
  size: number;
  bodyPart: string;
  woundType?: string;
  createDate?: Date;
  new: boolean;
  appendedPictures: Array<string>;
}

interface IApplicationState {
  wounds: IWoundState[];
  selectedWoundId: string | undefined;
  hoveredWoundId: string | undefined;
  markerPreviewSize: number;
  showResizePreview: boolean;
  hoveredBodyPart: string | undefined;
  gender: 'male' | 'female';
}

interface IApplicationInterface {
  addWound: (wound: Omit<IWoundState, 'id' | 'new'>) => string;
  updateWound: (wound: IWoundState) => void;
  removeWound: (id: string) => void;
  selectWound: (id: string | undefined) => void;
  setWoundHovered: (id: string | undefined) => void;
  setMarkerPreviewSize: (size: number) => void;
  setShowResizePreview: (showPreview: boolean) => void;
  setHoveredBodyPart: (hoveredBodyPart: string | undefined) => void;
  setGender: (gender: 'male' | 'female') => void;
}

interface IComputedApplicationInterface {
  hoveredWound: IWoundState | undefined;
  selectedWound: IWoundState | undefined;
}

export const useWoundStore = create<IApplicationState & IApplicationInterface>(
  (set) => ({
    wounds: [],
    markerPreviewSize: 25,
    selectedWoundId: undefined,
    hoveredWoundId: undefined,
    hoveredBodyPart: undefined,
    showResizePreview: false,
    gender: 'male',
    addWound: (wound) => {
      const id = uuidv4();
      set(({ wounds }) => ({
        wounds: [...wounds, { ...wound, id, new: true }],
      }));
      return id;
    },
    updateWound: (newWound: IWoundState) =>
      set(({ wounds }) => ({
        wounds: wounds.map((wound) =>
          wound.id === newWound.id ? { ...newWound, new: false } : wound
        ),
      })),
    removeWound: (deleteId) =>
      set(({ wounds }) => ({
        wounds: wounds.filter(({ id }) => id !== deleteId),
      })),
    selectWound: (selectId) =>
      set(({ selectedWoundId }) => ({
        selectedWoundId: selectedWoundId === selectId ? undefined : selectId,
      })),
    setWoundHovered: (hoveredId) =>
      set(() => ({
        hoveredWoundId: hoveredId,
      })),
    setMarkerPreviewSize: (markerPreviewSize) => {
      return set(() => ({
        markerPreviewSize,
      }));
    },
    setShowResizePreview: (showResizePreview) => {
      return set(() => ({
        showResizePreview,
      }));
    },
    setHoveredBodyPart: (hoveredBodyPart) => {
      return set(() => ({
        hoveredBodyPart,
      }));
    },
    setGender: (gender: 'male' | 'female') => {
      return set(() => ({
        gender,
        wounds: [],
        selectedWoundId: undefined,
      }));
    },
  })
);

export const useWoundDocStore = (): IApplicationState &
  IApplicationInterface &
  IComputedApplicationInterface => {
  const store = useWoundStore();

  return {
    ...store,
    hoveredWound: store.wounds.find(({ id }) => id === store.hoveredWoundId),
    selectedWound: store.wounds.find(({ id }) => id === store.selectedWoundId),
  };
};

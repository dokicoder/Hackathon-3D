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
}

interface IApplicationState {
  wounds: IWoundState[];
  selectedWoundId: string | undefined;
  hoveredWoundId: string | undefined;
  markerPreviewSize: number;
  showResizePreview: boolean;
}

interface IApplicationInterface {
  addWound: (wound: Omit<IWoundState,'id'>) => string;
  updateWound: (wound: IWoundState) => void;
  removeWound: (id: string) => void;
  selectWound: (id: string | undefined) => void;
  setWoundHovered: (id: string | undefined) => void;
  setMarkerPreviewSize: (size: number) => void;
  setShowResizePreview: (showPreview: boolean) => void;
}

interface IComputedApplicationInterface {
  hoveredWound: IWoundState | undefined;
  selectedWound: IWoundState | undefined;
}

export const useWoundStore = create<IApplicationState & IApplicationInterface>(
  (set) => ({
    wounds: [],
    markerPreviewSize: 50,
    selectedWoundId: undefined,
    hoveredWoundId: undefined,
    showResizePreview: false,
    addWound: (wound) => {
      const id = uuidv4();
      set(({ wounds }) => ({ wounds: [...wounds, {...wound, id }] }));
      return id;

   },
    updateWound: (newWound: IWoundState) =>
      set(({ wounds }) => ({
        wounds: wounds.map((wound) =>
        wound.id === newWound.id ? newWound : wound
        ),
      })),
    removeWound: (deleteId) =>
      set(({ wounds }) => ({
        wounds: wounds.filter(({id}) => id !== deleteId),
      })),
    selectWound: (selectId) =>
      set(({ selectedWoundId }) => ({
        selectedWoundId:
        selectedWoundId === selectId ? undefined : selectId,
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
  })
);

export const useWoundDocStore = (): IApplicationState &
  IApplicationInterface &
  IComputedApplicationInterface => {
  const store = useWoundStore();

  return {
    ...store,
    hoveredWound: store.wounds.find(({id}) => id === store.hoveredWoundId),
    selectedWound: store.wounds.find(({id}) => id === store.selectedWoundId),
  };
};

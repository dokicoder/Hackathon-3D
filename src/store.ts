import { Vector3 } from 'three';
import { create } from 'zustand';

export interface IWoundState {
  position: Vector3;
  //toggled: boolean;
  bodyPart: string;
  woundType?: string;
  createDate?: Date;
  appendedPictures: Array<File>
}

interface IApplicationState {
  wounds: IWoundState[];
  selectedWoundIdx: number | undefined;
  hoveredWoundIdx: number | undefined;
}

interface IApplicationInterface {
  addWound: (wound: IWoundState) => void;
  updateWound: (wound: IWoundState, idx: number) => void;
  removeWound: (idx: number) => void;
  selectWound: (idx: number | undefined) => void;
  setWoundHovered: (idx: number | undefined) => void;
}

interface IComputedApplicationInterface {
  hoveredWound: IWoundState | undefined;
  selectedWound: IWoundState | undefined;
}

export const useWoundStore = create<IApplicationState & IApplicationInterface>(
  (set) => ({
    wounds: [],
    selectedWoundIdx: undefined,
    hoveredWoundIdx: undefined,
    addWound: (wound) => set(({ wounds }) => ({ wounds: [...wounds, wound] })),
    updateWound: (newWound: IWoundState, udatedIdx: number) =>
      set(({ wounds }) => ({
        wounds: wounds.map((wound, idx) =>
          idx === udatedIdx ? newWound : wound
        ),
      })),
    removeWound: (deleteIdx) =>
      set(({ wounds }) => ({
        wounds: wounds.filter((_, idx) => idx !== deleteIdx),
      })),
    selectWound: (selectIdx) =>
      set(({ selectedWoundIdx }) => ({
        selectedWoundIdx:
          selectedWoundIdx === selectIdx ? undefined : selectIdx,
      })),
    setWoundHovered: (hoveredIdx) =>
      set(() => ({
        hoveredWoundIdx: hoveredIdx,
      })),
  })
);

export const useWoundDocStore = (): IApplicationState &
  IApplicationInterface &
  IComputedApplicationInterface => {
  const store = useWoundStore();

  return {
    ...store,
    hoveredWound: store.wounds[store.hoveredWoundIdx!],
    selectedWound: store.wounds[store.selectedWoundIdx!],
  };
};

import { Vector3 } from 'three';
import { create } from 'zustand';

export interface IWoundState {
  position: Vector3;
  //toggled: boolean;
  bodyPart: string;
}

interface IApplicationState {
  wounds: IWoundState[];
  selectedWoundIdx: number | undefined;
}

interface IApplicationInterface {
  addWound: (wound: IWoundState) => void;
  updateWound: (wound: IWoundState, idx: number) => void;
  removeWound: (idx: number) => void;
  selectWound: (idx: number | undefined) => void;
}

export const useWoundDocStore = create<
  IApplicationState & IApplicationInterface
>((set) => ({
  wounds: [],
  selectedWoundIdx: undefined,
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
    set(() => ({
      selectedWoundIdx: selectIdx,
    })),
}));

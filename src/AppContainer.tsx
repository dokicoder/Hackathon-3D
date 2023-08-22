import { TestScene } from './TestScene';
import { SideBar } from './components/Sidebar';
import { useState } from 'react';
import { useWoundDocStore } from './store';
import { WoundList } from './components/WoundList';

export type Wound = {
  woundType: string;
  createDate: Date;
};

export const AppContainer = (): JSX.Element => {
  const [wounds, setWound] = useState<Wound[]>([
    {
      createDate: new Date(),
      woundType: 'Schürfwunde',
    },
    {
      createDate: new Date(),
      woundType: 'Dekubitus',
    },
  ]);

  const { selectedWound, selectWound } = useWoundDocStore();

  return (
    <div id="main-container">
      <WoundList woundList={wounds} onSelectWound={selectWound as any} />
      <TestScene />

      {selectedWound && <SideBar key={selectedWound.woundType} />}
    </div>
  );
};

import { TestScene } from './TestScene';
import { SideBar } from './components/Sidebar';
import { useState } from 'react';
import { WondList } from './components/WoundList';

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

  const [selectedWound, setSelectedWound] = useState<Wound | null>(null);

  const addWound = (wound: Wound) => {
    setWound((prev) => [...prev, wound]);
    setSelectedWound(null);
  };

  return (
    <div id="main-container">
      <WondList woundList={wounds} onSelectWound={setSelectedWound} />
      <TestScene />

      {selectedWound && (
        <SideBar
          key={selectedWound.woundType}
          wound={selectedWound}
          saveWound={addWound}
        />
      )}
    </div>
  );
};

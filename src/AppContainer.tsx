import { TestScene } from "./TestScene";
import { SideBar } from "./components/Sidebar";
import { useState } from "react";
import { WondList } from "./components/WoundList";

export type Wound = {
  woundType: string;
  createDate: Date;
};

export const AppContainer = (): JSX.Element => {
  const [wounds, setWound] = useState<Wound[]>([
    {
      createDate: new Date(),
      woundType: "Schürfwunde",
    },
    {
      createDate: new Date(),
      woundType: "Dekubitus",
    },
  ]);

  const addWound = (wound: Wound) => {
    setWound((prev) => [...prev, wound]);
  };

  return (
    <div id="main-container">
      <WondList woundList={wounds} />
      <TestScene />
      <SideBar wound={wounds[0]} />
    </div>
  );
};

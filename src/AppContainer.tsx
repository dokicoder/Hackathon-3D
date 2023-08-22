import { TestScene } from "./TestScene";
import { SideBar } from "./components/Sidebar";

export const AppContainer = (): JSX.Element => {
  return (
    <div id="main-container">
      <TestScene />
      <SideBar />
    </div>
  );
};

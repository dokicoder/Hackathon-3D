import { TestScene } from './TestScene';
import { SideBar } from './components/Sidebar';
import { useWoundDocStore } from './store';
import { ToolBar } from './components/ToolBar';
import { BottomBar } from './components/BottomBar';

export const AppContainer = (): JSX.Element => {
  const { selectedWoundId } = useWoundDocStore();

  return (
    <div id="main-container">
      <div className="test-scene-container">
        <TestScene />
        <ToolBar />
        <BottomBar />
      </div>
      <SideBar key={selectedWoundId} />
    </div>
  );
};

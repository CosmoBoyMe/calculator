import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ModeNames } from '../../shared/constants/ModeNames';
import { appSelectActiveMode } from '../../store/slices/app/selectors';
import { appActions } from '../../store/slices/app/slice';
import { calculatorActions } from '../../store/slices/calculator/slice';
import { Calculator } from '../Calculator/Calculator';
import { SideBar } from '../SideBar/SideBar';
import { Tabs } from '../Tabs/Tabs';
import { tabsItems } from './constants';
import './App.scss';

const App: FC = () => {
  const activeMode = useAppSelector(appSelectActiveMode);

  const dispatch = useAppDispatch();

  const handleTabClick = (mode: ModeNames) => {
    dispatch(appActions.setActiveModeName(mode));
    dispatch(calculatorActions.reset());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="app__inner">
          <div className="app__tabs">
            <Tabs
              activeName={activeMode}
              items={tabsItems}
              onClick={handleTabClick}
            />
          </div>
          <main className="app__main">
            {activeMode === ModeNames.Constructor && <SideBar />}
            <div className="app__calculator">
              <Calculator />
            </div>
          </main>
        </div>
      </div>
    </DndProvider>
  );
};

export { App };

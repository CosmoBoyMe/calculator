import { FC } from 'react';
import classNames from 'classnames';

import { appSelectCalculatorItems } from '../../store/slices/app/selectors';
import { useAppSelector } from '../../hooks/redux';
import { DndTypes } from '../../shared/constants/DnDTypes';
import { Display } from '../Display/Display';
import { DragItem } from '../DragItem/DragItem';
import { EqualButton } from '../EqualButton/EqualButton';
import { Numpad } from '../Numpad/Numpad';
import { Operators } from '../Operators/Operators';
import './SideBar.scss';

const SideBar: FC = () => {
  const calculatorItems = useAppSelector(appSelectCalculatorItems);

  return (
    <div className="sidebar">
      <DragItem
        canDrag={!calculatorItems.includes(DndTypes.Display)}
        type={DndTypes.Display}
      >
        <div
          className={classNames('sidebar__item', {
            'sidebar__item--inactive': calculatorItems.includes(
              DndTypes.Display
            ),
          })}
        >
          <Display value="0" />
        </div>
      </DragItem>
      <DragItem
        canDrag={!calculatorItems.includes(DndTypes.Operators)}
        type={DndTypes.Operators}
      >
        <div
          className={classNames('sidebar__item', {
            'sidebar__item--inactive': calculatorItems.includes(
              DndTypes.Operators
            ),
          })}
        >
          <Operators />
        </div>
      </DragItem>
      <DragItem
        canDrag={!calculatorItems.includes(DndTypes.NumPad)}
        type={DndTypes.NumPad}
      >
        <div
          className={classNames('sidebar__item', {
            'sidebar__item--inactive': calculatorItems.includes(
              DndTypes.NumPad
            ),
          })}
        >
          <Numpad />
        </div>
      </DragItem>
      <DragItem
        canDrag={!calculatorItems.includes(DndTypes.Equal)}
        type={DndTypes.Equal}
      >
        <div
          className={classNames('sidebar__item', {
            'sidebar__item--inactive': calculatorItems.includes(DndTypes.Equal),
          })}
        >
          <EqualButton />
        </div>
      </DragItem>
    </div>
  );
};

export { SideBar };

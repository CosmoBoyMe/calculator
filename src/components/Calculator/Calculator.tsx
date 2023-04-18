import { FC, useState } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';

import placeSvg from '../../assets/svg/place.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { DndTypes } from '../../shared/constants/DnDTypes';
import { ModeNames } from '../../shared/constants/ModeNames';
import { OperatorsEnum } from '../../shared/constants/OperatorsEnum';
import {
  appSelectActiveMode,
  appSelectCalculatorItems,
} from '../../store/slices/app/selectors';
import { appActions } from '../../store/slices/app/slice';
import { calculatorSelectScreenValue } from '../../store/slices/calculator/selectors';
import { calculatorActions } from '../../store/slices/calculator/slice';
import { Display } from '../Display/Display';
import { DragItem } from '../DragItem/DragItem';
import { EqualButton } from '../EqualButton/EqualButton';
import { Numpad } from '../Numpad/Numpad';
import { Operators } from '../Operators/Operators';
import './Calculator.scss';

const Calculator: FC = () => {
  const activeMode = useAppSelector(appSelectActiveMode);
  const calculatorItems = useAppSelector(appSelectCalculatorItems);
  const screenValue = useAppSelector(calculatorSelectScreenValue);
  const dispatch = useAppDispatch();

  const [overlayItemType, setOverlayItemType] = useState<DndTypes | null>(null);

  const [{ isOver, currentDraggedItem }, drop] = useDrop(
    () => ({
      accept: Object.values(DndTypes),
      drop: ({ type }: { type: DndTypes }) => {
        const isItemAlreadyMoved = calculatorItems.includes(type);
        if (overlayItemType === DndTypes.Display) {
          return;
        }
        if (!isItemAlreadyMoved) {
          dispatch(appActions.moveItem(type));
        } else if (overlayItemType) {
          const oldIndex = calculatorItems.indexOf(type);
          const newIndex = calculatorItems.indexOf(overlayItemType);
          if (oldIndex < newIndex) {
            dispatch(
              appActions.reorderItems({ from: oldIndex, to: newIndex - 1 })
            );
          } else {
            dispatch(appActions.reorderItems({ from: oldIndex, to: newIndex }));
          }
        } else {
          const currentItemIndex = calculatorItems.indexOf(type);
          dispatch(
            appActions.reorderItems({
              from: currentItemIndex,
              to: calculatorItems.length,
            })
          );
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        currentDraggedItem: monitor.getItemType() as DndTypes | null,
      }),
    }),
    [calculatorItems, overlayItemType]
  );

  const handleComponentDoubleClick = (type: DndTypes) => {
    if (activeMode === ModeNames.Runtime) return;
    dispatch(appActions.removeItem(type));
  };

  const handleOperatorClick = (operator: OperatorsEnum) =>
    dispatch(calculatorActions.addOperator(operator));

  const handleEqualButtonClick = () => dispatch(calculatorActions.calculate());

  const handleNumpadNumberClick = (number: number) =>
    dispatch(calculatorActions.addValue(number));

  const handleNumpadPointClick = () => dispatch(calculatorActions.addPoint());

  const shouldShowBottomLine =
    (isOver &&
      overlayItemType === null &&
      currentDraggedItem !== DndTypes.Display) ||
    (currentDraggedItem !== null &&
      !calculatorItems.includes(currentDraggedItem) &&
      isOver &&
      currentDraggedItem !== DndTypes.Display);

  return (
    <div
      className={classNames('calculator', {
        'calculator--is-over': isOver && calculatorItems.length < 1,
        'calculator--empty': calculatorItems.length < 1,
      })}
      ref={drop}
    >
      {calculatorItems.length ? (
        <>
          {calculatorItems.map((type, index) => {
            let component = null;

            switch (type) {
              case DndTypes.Display: {
                component = <Display value={screenValue} />;
                break;
              }
              case DndTypes.Operators: {
                component = (
                  <Operators
                    isActive={activeMode === ModeNames.Runtime}
                    onClick={handleOperatorClick}
                    onKeyDown={handleOperatorClick}
                  />
                );
                break;
              }
              case DndTypes.NumPad: {
                component = (
                  <Numpad
                    isActive={activeMode === ModeNames.Runtime}
                    onClickNumber={handleNumpadNumberClick}
                    onKeyDownNumber={handleNumpadNumberClick}
                    onClickPoint={handleNumpadPointClick}
                    onKeyDownPoint={handleNumpadPointClick}
                  />
                );
                break;
              }
              case DndTypes.Equal: {
                component = (
                  <EqualButton
                    isActive={activeMode === ModeNames.Runtime}
                    onClick={handleEqualButtonClick}
                    onKeyDown={handleEqualButtonClick}
                  />
                );
                break;
              }

              default:
                return null;
            }

            const shouldShowTopLine =
              (overlayItemType !== null &&
                overlayItemType === type &&
                overlayItemType !== DndTypes.Display &&
                currentDraggedItem !== DndTypes.Display &&
                currentDraggedItem !== null &&
                calculatorItems.includes(currentDraggedItem)) ||
              (currentDraggedItem === DndTypes.Display && index === 0);

            return (
              <div className="calculator__item" key={type}>
                {shouldShowTopLine && <div className="calculator__line" />}
                <DragItem
                  key={type}
                  type={type}
                  index={index}
                  canDrag={
                    type !== DndTypes.Display &&
                    activeMode !== ModeNames.Runtime
                  }
                  setOverlayItemType={setOverlayItemType}
                >
                  <div
                    onDoubleClick={() => handleComponentDoubleClick(type)}
                    className="calculator__row"
                  >
                    {component}
                  </div>
                </DragItem>
              </div>
            );
          })}
          {shouldShowBottomLine && (
            <div className="calculator__line calculator__line--bottom" />
          )}
        </>
      ) : (
        <div className="calculator__info">
          <img className="calculator__svg" src={placeSvg} alt="place" />
          <p className="calculator__text">Перетащите сюда</p>
          <p className="calculator__sub-text">любой элемент из левой панели</p>
        </div>
      )}
    </div>
  );
};

export { Calculator };

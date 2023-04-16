import { FC, useEffect } from 'react';
import classNames from 'classnames';

import { Button } from '../Button/Button';
import './Numpad.scss';

type Props = {
  isActive?: boolean;
  onClickNumber?: (number: number) => void;
  onKeyDownNumber?: (number: number) => void;
  onClickPoint?: () => void;
  onKeyDownPoint?: () => void;
};

const numpadItems = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];

const Numpad: FC<Props> = ({
  isActive = false,
  onClickNumber,
  onClickPoint,
  onKeyDownNumber,
  onKeyDownPoint,
}) => {
  const handleButtonClick = (item: string | number) => {
    if (!isActive) return;
    if (typeof item === 'number') {
      onClickNumber?.(item);
    } else {
      onClickPoint?.();
    }
  };

  useEffect(() => {
    const handleButtonKeyDown = (event: KeyboardEvent) => {
      const isNumber = /^[0-9]$/i.test(event.key);
      if (isNumber) {
        onKeyDownNumber?.(Number(event.key));
      } else if (event.key === '.' || event.key === ',') {
        onKeyDownPoint?.();
      }
    };

    if (isActive) {
      window.document.addEventListener('keydown', handleButtonKeyDown);
    }

    return () =>
      window.document.removeEventListener('keydown', handleButtonKeyDown);
  }, [onKeyDownNumber, onKeyDownPoint, isActive]);

  return (
    <div className="numpad">
      {numpadItems.map((item) => (
        <div
          className={classNames('numpad__item', {
            'numpad__item--large': item === 0,
          })}
          key={item}
        >
          <Button
            onClick={() => handleButtonClick(item)}
            isActive={isActive}
            text={String(item)}
          />
        </div>
      ))}
    </div>
  );
};

export { Numpad };

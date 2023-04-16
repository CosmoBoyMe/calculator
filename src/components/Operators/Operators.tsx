import { FC, useEffect } from 'react';

import { OperatorsEnum } from '../../shared/constants/OperatorsEnum';
import { Button } from '../Button/Button';
import './Operators.scss';

type Props = {
  isActive?: boolean;
  onClick?: (operator: OperatorsEnum) => void;
  onKeyDown?: (operator: OperatorsEnum) => void;
};

const operatorsList = [
  OperatorsEnum.Division,
  OperatorsEnum.Multiply,
  OperatorsEnum.Minus,
  OperatorsEnum.Plus,
];

const Operators: FC<Props> = ({ isActive = false, onClick, onKeyDown }) => {
  const handleOperatorClick = (operator: OperatorsEnum) => {
    if (!isActive) return;
    onClick?.(operator);
  };

  useEffect(() => {
    const handleOperatorKeyDown = (event: KeyboardEvent) => {
      if (event.key === '*') {
        onKeyDown?.(OperatorsEnum.Multiply);
      } else if (event.key === OperatorsEnum.Minus) {
        onKeyDown?.(OperatorsEnum.Minus);
      } else if (event.key === OperatorsEnum.Plus) {
        onKeyDown?.(OperatorsEnum.Plus);
      } else if (event.key === OperatorsEnum.Division) {
        onKeyDown?.(OperatorsEnum.Division);
      }
    };

    if (isActive) {
      window.document.addEventListener('keydown', handleOperatorKeyDown);
    }

    return () => {
      window.document.removeEventListener('keydown', handleOperatorKeyDown);
    };
  }, [isActive, onKeyDown]);

  return (
    <div className="operators">
      {operatorsList.map((operator) => (
        <Button
          isActive={isActive}
          onClick={() => handleOperatorClick?.(operator)}
          key={operator}
          text={operator}
        />
      ))}
    </div>
  );
};

export { Operators };

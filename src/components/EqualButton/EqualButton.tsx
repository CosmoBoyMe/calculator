import { FC, useEffect } from 'react';
import classNames from 'classnames';

import './EqualButton.scss';

type Props = {
  isActive?: boolean;
  onClick?: () => void;
  onKeyDown?: () => void;
};

const EqualButton: FC<Props> = ({ isActive = false, onClick, onKeyDown }) => {
  const handleButtonClick = () => {
    if (!isActive) return;
    onClick?.();
  };

  useEffect(() => {
    const handleButtonKeyDown = (event: KeyboardEvent) => {
      if (event.key === '=') onKeyDown?.();
    };

    if (isActive) {
      window.document.addEventListener('keydown', handleButtonKeyDown);
    }

    return () =>
      window.document.removeEventListener('keydown', handleButtonKeyDown);
  }, [isActive, onKeyDown]);

  return (
    <button
      className={classNames('equal-button', {
        'equal-button--active': isActive,
      })}
      onClick={handleButtonClick}
      type="button"
    >
      =
    </button>
  );
};

export { EqualButton };

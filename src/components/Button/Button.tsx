import { FC, KeyboardEvent, MouseEvent } from 'react';
import classNames from 'classnames';

import './Button.scss';

type Props = {
  text: string;
  isActive?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button: FC<Props> = ({ text, isActive = false, onKeyDown, onClick }) => (
  <button
    className={classNames('button', {
      'button--active': isActive,
    })}
    onClick={onClick}
    onKeyDown={onKeyDown}
    type="button"
  >
    {text}
  </button>
);

export { Button };

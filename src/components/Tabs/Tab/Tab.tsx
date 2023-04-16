import { FC } from 'react';
import cn from 'classnames';

import { ModeNames } from '../../../shared/constants/ModeNames';
import { SvgType } from '../../../shared/types/SvgType';
import './Tab.scss';

type Props = {
  text: string;
  name: ModeNames;
  CustomSvg: SvgType;
  isActive?: boolean;
  onClick?: (name: ModeNames) => void;
};

const Tab: FC<Props> = ({
  text,
  CustomSvg,
  name,
  isActive = false,
  onClick,
}) => (
  <button
    className={cn('tab', {
      'tab--active': isActive,
    })}
    type="button"
    onClick={() => onClick?.(name)}
  >
    <CustomSvg />
    <span className="tab__text">{text}</span>
  </button>
);

export { Tab };

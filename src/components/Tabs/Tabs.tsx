import { FC } from 'react';

import { ModeNames } from '../../shared/constants/ModeNames';
import { SvgType } from '../../shared/types/SvgType';
import { Tab } from './Tab/Tab';
import './Tabs.scss';

type Props = {
  items: { CustomSvg: SvgType; text: string; name: ModeNames }[];
  activeName: string;
  onClick: (mode: ModeNames) => void;
};

const Tabs: FC<Props> = ({ items, activeName, onClick }) => {
  const handleTabClick = (name: ModeNames) => {
    if (name === activeName) return;
    onClick?.(name);
  };

  return (
    <div className="tabs">
      {items.map(({ CustomSvg, text, name }) => (
        <Tab
          key={name}
          CustomSvg={CustomSvg}
          isActive={activeName === name}
          text={text}
          name={name}
          onClick={handleTabClick}
        />
      ))}
    </div>
  );
};

export { Tabs };

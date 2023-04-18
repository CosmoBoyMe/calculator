import { ReactComponent as RuntimeSvg } from '../../assets/svg/eye.svg';
import { ReactComponent as ConstructorSvg } from '../../assets/svg/selector.svg';
import { ModeNames } from '../../shared/constants/ModeNames';

const tabsItems = [
  { name: ModeNames.Runtime, text: ModeNames.Runtime, CustomSvg: RuntimeSvg },
  {
    name: ModeNames.Constructor,
    text: ModeNames.Constructor,
    CustomSvg: ConstructorSvg,
  },
];

export { tabsItems };

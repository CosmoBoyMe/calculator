import { FC } from 'react';
import { Textfit } from '@namhong2001/react-textfit';

import './Display.scss';

type Props = {
  value: string;
};

const Display: FC<Props> = ({ value }) => (
  <Textfit className="display" mode="single" max={36}>
    {value}
  </Textfit>
);

export { Display };

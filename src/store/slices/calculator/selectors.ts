import { RootState } from '../..';

const calculatorSelectScreenValue = (state: RootState) =>
  state.calculator.screenValue;

export { calculatorSelectScreenValue };

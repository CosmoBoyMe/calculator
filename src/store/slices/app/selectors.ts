import { RootState } from '../..';

const appSelectActiveMode = (state: RootState) => state.app.activeMode;
const appSelectCalculatorItems = (state: RootState) =>
  state.app.calculatorItems;

export { appSelectActiveMode, appSelectCalculatorItems };

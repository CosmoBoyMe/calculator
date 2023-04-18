import { OperatorsEnum } from '../../../shared/constants/OperatorsEnum';

const calculatorOperations = {
  [OperatorsEnum.Division]: (prevValue: number, nextValue: number) =>
    prevValue / nextValue,
  [OperatorsEnum.Multiply]: (prevValue: number, nextValue: number) =>
    prevValue * nextValue,
  [OperatorsEnum.Plus]: (prevValue: number, nextValue: number) =>
    prevValue + nextValue,
  [OperatorsEnum.Minus]: (prevValue: number, nextValue: number) =>
    prevValue - nextValue,
};

const getParsedValue = (value: string) => parseFloat(value.replace(/,/g, '.'));
const getValueWithComma = (value: number) =>
  value.toString().replace(/\./g, ',');

const getFixedNumber = (value: number) =>
  Number(value.toFixed(4).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1'));

export {
  calculatorOperations,
  getParsedValue,
  getValueWithComma,
  getFixedNumber,
};

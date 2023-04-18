import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OperatorsEnum } from '../../../shared/constants/OperatorsEnum';
import {
  calculatorOperations,
  getFixedNumber,
  getValueWithComma,
  getParsedValue,
} from './helpers';

type InitialState = {
  screenValue: string;
  operator: OperatorsEnum | null;
  result: number | null;
  firstOperand: number;
  secondOperand: number | null;
  isValueCalculated: boolean;
};

const initialState: InitialState = {
  screenValue: '0',
  operator: null,
  result: null,
  firstOperand: 0,
  secondOperand: null,
  isValueCalculated: false,
};

const ZERO_DIVISION_TEXT = 'Не определенно';

const NAMESPACE = 'app';

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    addValue: (state, { payload }: PayloadAction<number>) => {
      const shouldUpdateFirstOperator = state.operator === null;

      if (state.isValueCalculated) {
        state.screenValue = String(payload);
        state.firstOperand = payload;
        state.result = null;
        state.isValueCalculated = false;
        state.operator = null;
        state.secondOperand = null;
      } else if (shouldUpdateFirstOperator) {
        if (
          state.screenValue === '0' ||
          state.screenValue === ZERO_DIVISION_TEXT
        ) {
          state.screenValue = String(payload);
          state.firstOperand = payload;
        } else {
          const newValue = state.screenValue + String(payload);
          state.screenValue = newValue;
          state.firstOperand = getParsedValue(newValue);
        }
      } else if (!shouldUpdateFirstOperator) {
        if (state.secondOperand === null) {
          state.screenValue = String(payload);
          state.secondOperand = payload;
        } else {
          const newValue = state.screenValue + String(payload);
          state.screenValue = newValue;
          state.secondOperand = getParsedValue(newValue);
        }
      }
    },

    addOperator: (state, { payload }: PayloadAction<OperatorsEnum>) => {
      if (state.operator !== null && state.secondOperand !== null) {
        const isZeroDivision =
          state.operator === OperatorsEnum.Division &&
          (state.firstOperand === 0 || state.secondOperand === 0);

        if (isZeroDivision) {
          state.screenValue = ZERO_DIVISION_TEXT;
          state.firstOperand = 0;
          state.secondOperand = null;
          state.result = null;
          state.operator = null;
        } else {
          const resultValue = getFixedNumber(
            calculatorOperations[state.operator](
              state.firstOperand,
              state.secondOperand
            )
          );

          state.result = resultValue;
          state.firstOperand = resultValue;
          state.secondOperand = null;
          state.screenValue = getValueWithComma(resultValue);
          state.operator = payload;
        }
      } else {
        state.operator = payload;
      }
      state.isValueCalculated = false;
    },

    addPoint: (state) => {
      if (state.secondOperand) {
        state.screenValue = '0,';
      } else if (!state.screenValue.includes(',')) {
        state.screenValue += ',';
      }
    },

    calculate: (state) => {
      const isZeroDivision =
        state.operator === OperatorsEnum.Division &&
        (state.firstOperand === 0 || state.secondOperand === 0);

      if (isZeroDivision) {
        state.result = null;
        state.firstOperand = 0;
        state.secondOperand = null;
        state.screenValue = ZERO_DIVISION_TEXT;
        state.operator = null;
      } else if (
        state.operator !== null &&
        state.secondOperand !== null &&
        state.result === null
      ) {
        const resultValue = getFixedNumber(
          calculatorOperations[state.operator](
            state.firstOperand,
            state.secondOperand
          )
        );
        state.screenValue = getValueWithComma(resultValue);
        state.result = resultValue;
        state.isValueCalculated = true;
      } else if (
        state.operator !== null &&
        state.secondOperand !== null &&
        state.result !== null
      ) {
        const resultValue = getFixedNumber(
          calculatorOperations[state.operator](
            state.result,
            state.secondOperand
          )
        );
        state.firstOperand = state.result;
        state.result = resultValue;
        state.screenValue = getValueWithComma(resultValue);
        state.isValueCalculated = true;
      } else if (
        state.operator !== null &&
        state.secondOperand === null &&
        state.result !== null
      ) {
        const resultValue = getFixedNumber(
          calculatorOperations[state.operator](state.result, state.firstOperand)
        );
        state.result = resultValue;
        state.screenValue = getValueWithComma(resultValue);
        state.isValueCalculated = true;
      }
    },

    reset: (state) => {
      state.screenValue = '0';
      state.operator = null;
      state.result = null;
      state.firstOperand = 0;
      state.secondOperand = null;
      state.isValueCalculated = false;
    },
  },
});

export const { reducer: calculatorReducer, actions: calculatorActions } = slice;

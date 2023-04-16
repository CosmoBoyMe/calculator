import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DndTypes } from '../../../shared/constants/DnDTypes';
import { ModeNames } from '../../../shared/constants/ModeNames';

type InitialState = {
  activeMode: ModeNames;
  calculatorItems: DndTypes[];
};

const initialState: InitialState = {
  activeMode: ModeNames.Constructor,
  calculatorItems: [],
};

const NAMESPACE = 'app';

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setActiveModeName: (state, { payload }: PayloadAction<ModeNames>) => {
      state.activeMode = payload;
    },

    moveItem: (state, { payload }: PayloadAction<DndTypes>) => {
      if (payload === DndTypes.Display) {
        state.calculatorItems = [payload, ...state.calculatorItems];
      } else {
        state.calculatorItems.push(payload);
      }
    },

    removeItem: (state, { payload }: PayloadAction<DndTypes>) => {
      state.calculatorItems = state.calculatorItems.filter(
        (item) => item !== payload
      );
    },

    reorderItems: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      state.calculatorItems.splice(
        payload.to,
        0,
        state.calculatorItems.splice(payload.from, 1)[0]
      );
    },
  },
});

export const { reducer: appReducer, actions: appActions } = slice;

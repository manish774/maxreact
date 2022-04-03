import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    showCounter(state) {
      state.showCounter = !state.showCounter;
    },
    incrementByAny(state, action) {
      state.counter = state.counter + action.payload;
    }
  }
});

export const counterAction = counterSlice.actions;
export default counterSlice;
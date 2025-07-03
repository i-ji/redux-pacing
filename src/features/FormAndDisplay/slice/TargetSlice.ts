import { createSlice } from "@reduxjs/toolkit";
import { LogType } from "@/utils/interface";

export interface targetState {
  cumulative: LogType[];
  lap: LogType[];
  avarage: string;
}

const initialState: targetState = {
  cumulative: [],
  lap: [],
  avarage: "",
};

export const targetSlice = createSlice({
  name: "targetPace",
  initialState: initialState,
  reducers: {
    outputCumulative: (state, action) => {
      state.cumulative = action.payload;
    },
    outputLap: (state, action) => {
      state.lap = action.payload;
    },
    outputAvarage: (state, action) => {
      state.avarage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { outputCumulative, outputLap, outputAvarage } =
  targetSlice.actions;

export default targetSlice.reducer;

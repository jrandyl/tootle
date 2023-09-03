import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
        state.origin = action.payload;
        },

        setDestination: (state, action) => {
        state.destination = action.payload;
        },

        setTravelTimeInformation: (state, action) => {
        state.travelTimeInformation = action.payload;
        },
    },
})

export const { setOrigin, setDestination, setTravelTimeInformation } = dataSlice.actions;

export const selectOrigin = (state) => state.data.origin;
export const selectDestination = (state) => state.data.destination;
export const selectTravelTimeInformation = (state) =>
  state.data.travelTimeInformation;

export default dataSlice.reducer;

export const store = configureStore({
    reducer: {
      data: dataSlice.reducer,
    },
  });
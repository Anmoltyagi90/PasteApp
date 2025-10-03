import { configureStore, createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "pastes",
  initialState: INITIAL_VALUE,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },

    updateToPastes: (state, action) => {
      const updated = action.payload;
      const index = state.pastes.findIndex((p) => p.id === updated.id);
      if (index !== -1) {
        state.pastes[index] = updated;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
      }
    },

    removeFromPaste: (state, action) => {
      const id = action.payload;
      state.pastes = state.pastes.filter((p) => p.id !== id);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

const store = configureStore({
  reducer: {
    paste: pasteSlice.reducer,
  },
});

export default store;
export const { addToPastes, updateToPastes, removeFromPaste, resetAllPastes } =
  pasteSlice.actions;

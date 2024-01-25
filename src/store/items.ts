import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "../lib/types";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [] as Item[],
  },
  reducers: {
    addItem: (state, action) => {
      state.items = [action.payload, ...state.items];
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.removeId
      );
    },
    updateItem: (state, action) => {
      const updateableItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.updateId
      );
      const updateableItem = state.items[updateableItemIndex];
      const updatedItem = { ...updateableItem, ...action.payload.data };
      state.items[updateableItemIndex] = updatedItem;
    },
    setItems: (state, action) => {
      state.items = action.payload.items.reverse();
    },
  },
});

export const addItem = itemsSlice.actions.addItem;
export const deleteItem = itemsSlice.actions.deleteItem;
export const updateItem = itemsSlice.actions.updateItem;
export const setItems = itemsSlice.actions.setItems;
export default itemsSlice.reducer;

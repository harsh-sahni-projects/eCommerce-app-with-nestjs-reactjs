import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    amount: 0,
		totalItems: 0,
  },
  reducers: {
    addItem(state, action) {
      const bookDetails = action.payload;
			const index = state.items.findIndex(item => item.id == bookDetails.id);
			if (index == -1) {
				const newItem = {
					...bookDetails,
					quantity: 1
				}
				state.items.push(newItem);
			} else {
				state.items[index].quantity++
			}
			
			state.amount += bookDetails.unitPrice;
			state.totalItems += 1;
    },
    removeItem(state, action) {
      const itemId = action.payload.id;
			const index = state.items.findIndex(e => e.id == itemId);
			if (index == -1) return;
			state.items[index].quantity--;
			state.amount -= state.items[index].unitPrice;
			state.totalItems--;
			if (state.items[index].quantity == 0) {
				state.items.splice(index,1);
			}
    }
  }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
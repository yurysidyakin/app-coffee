import { create } from "zustand";
import { CoffeeQueryParams, CoffeeType } from "../types/coffeeTypes";

import { devtools, persist } from "zustand/middleware";

import { immer } from "zustand/middleware/immer";
import { cartSlice } from "./cartSlice";
import { listSlice } from "./listSlice";
import {
	CoffeeCartActions,
	CoffeeCartState,
	CoffeeListActions,
	CoffeeListState,
} from "./storeTypes";

export const useCoffeeStore = create<
	CoffeeListActions & CoffeeListState & CoffeeCartActions & CoffeeCartState
>()(
	devtools(
		persist(
			immer((...args) => ({ ...listSlice(...args), ...cartSlice(...args) })),
			{
				name: "coffeeStore",
				partialize: (state) => ({ cart: state.cart, address: state.address }),
			},
		),
		{
			name: "coffeeStore",
		},
	),
);

export const getCoffeeList = (params?: CoffeeQueryParams) =>
	useCoffeeStore.getState().getCoffeeList(params);

export const addToCart = (item: CoffeeType) =>
	useCoffeeStore.getState().addToCart(item);

export const orderCoffee = () => useCoffeeStore.getState().orderCoffee();

export const setAddress = (address: string) =>
	useCoffeeStore.getState().setAddress(address);

export const clearCart = () => useCoffeeStore.getState().clearCart();

export const setParams = (params: CoffeeQueryParams) =>
	useCoffeeStore.getState().setParams(params);

export const deleteToCart = (id: number) =>
	useCoffeeStore.getState().deleteToCart(id);

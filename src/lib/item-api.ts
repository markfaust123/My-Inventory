import axios from "axios";
import { FIREBASE_APP_NAME } from "@env";
import type { Item } from "../types/items-types";

const API_URL = `https://${FIREBASE_APP_NAME}-default-rtdb.firebaseio.com`;

export const storeItem = async (
  itemData: Omit<Item, "id">
): Promise<string> => {
  const response = await axios.post(`${API_URL}/items.json`, itemData);
  const id = response.data.name;
  return id;
};

export const fetchItems = async (): Promise<Item[]> => {
  const response = await axios.get(`${API_URL}/items.json`);

  const items = [];

  for (const key in response.data) {
    const item: Item = {
      id: key,
      name: response.data[key].name,
      price: response.data[key].price,
      quantity: response.data[key].quantity,
      description: response.data[key].description,
      createdAt: response.data[key].createdAt,
      updatedAt: response.data[key].updatedAt,
    };
    items.push(item);
  }

  return items;
};

export const putItem = (
  id: string,
  itemData: Omit<Item, "id">
): Promise<Item> => {
  return axios.put(`${API_URL}/items/${id}.json`, itemData);
};

export const removeItem = async (id: string): Promise<Item> => {
  return axios.delete(`${API_URL}/items/${id}.json`);
};

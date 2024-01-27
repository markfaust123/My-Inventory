// Item type to handle items in the inventory
export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

// Credentials type to handle user authentication
export type Credentials = {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

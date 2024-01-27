import { GOOGLE_FIREBASE_AUTH_API_KEY } from "@env";
import axios from "axios";

const API_KEY: string = GOOGLE_FIREBASE_AUTH_API_KEY;
const API_URL_BASE: string = `https://identitytoolkit.googleapis.com/v1/accounts`;

export const authenticate = async (
  mode: string,
  email: string,
  password: string
) => {
  const url = `${API_URL_BASE}:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return response.data.idToken;
};

export const createUser = async (
  email: string,
  password: string
): Promise<any> => {
  return authenticate("signUp", email, password);
};

export const login = async (email: string, password: string): Promise<any> => {
  return authenticate("signInWithPassword", email, password);
};

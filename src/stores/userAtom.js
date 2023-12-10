import { atom } from 'jotai';


export const userAtom = atom({
  email: "",
  id: "",
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  cartId: "",
  cart: [],
});

export const cartAtom = atom([]);
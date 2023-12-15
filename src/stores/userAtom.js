import { atom } from 'jotai';

export const userAtom = atom({
  id: null,
  isLoggedIn: false,
  token: null,
  cartId: null,
  isAdmin: false,
  email: null,

});

// Atome pour stocker les informations du panier
export const cartAtom = atom({
  cart: [], // Initialisé avec un tableau vide
});
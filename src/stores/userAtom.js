import { atom } from 'jotai';

// Atome pour stocker les informations de l'utilisateur
// userAtom initial
export const userAtom = atom({
  id: null,
  isLoggedIn: false,
  token: null,
  cartId: null,
  isAdmin: false,
});

// Atome pour stocker les informations du panier
export const cartAtom = atom({
  cart: [], // Initialisé avec un tableau vide
});

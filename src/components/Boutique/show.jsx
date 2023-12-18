import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, cartAtom } from '../../stores/userAtom';

// const API_URL = `${import.meta.env.VITE_BASE_URL}`;
import { API_URL } from "../../stores/apiUrl";

const ShowBoutique = () => {
  const { itemId } = useParams();
  const [user] = useAtom(userAtom);
  const cartId = Cookies.get('cartId');
  const setCart = useSetAtom(cartAtom);
  const [cart] = useAtom(cartAtom);
  const cartItems = cart.cart || [];
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1); // Initialisez la quantité à 1

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/items/${itemId}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);

        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error);
      }
    };

    fetchData();
  }, [itemId]);

  const addToCart = () => {
    if (user.id && user.token && cartId) {
      // Obtenir l'identifiant de l'utilisateur
      const userId = user.id;
  
      // Récupérer le panier actuel s'il existe
      const existingCartItems = JSON.parse(Cookies.get(`cartItems_${userId}`) || '[]');
  
      // Convertir la quantité en nombre
      const parsedQuantity = parseInt(quantity, 10);
  
      // Vérifier si l'article est déjà dans le panier
      const existingProductIndex = existingCartItems.findIndex((cartItem) => cartItem.id === item.id);
  
      if (existingProductIndex >= 0) {
        // L'article existe déjà dans le panier, mettez à jour la quantité
        existingCartItems[existingProductIndex].quantity += parsedQuantity;
      } else {
        // L'article n'existe pas dans le panier, ajoutez-le
        const newCartItem = { ...item, quantity: parsedQuantity };
        existingCartItems.push(newCartItem);
      }
  
      // Enregistrer le panier mis à jour dans le cookie
      Cookies.set(`cartItems_${userId}`, JSON.stringify(existingCartItems), { expires: 1 });
  
      // Rediriger vers la page du panier
      navigate(`/cart/${cartId}`);
    } else {
      console.error("Utilisateur non connecté ou identifiant d'utilisateur non défini");
    }
  };
  
  


  return (
    <section className="p-2">
      <div className="rounded-lg shadow-md overflow-hidden bg-gray-800 mt-4 mb-4 mx-2">
        <img src={item.image_url} alt={item.title} className="w-full h-auto" />
        <div className="p-3">
          <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-semibold mb-2">
            {item.title}
          </h2>
          <p className="text-white mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{item.description}</p>
          <p className="text-green-500 font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            €{item.price}
          </p>
          <div className="mt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="flex items-center"
            >
              <input type="hidden" name="item_id" value={item.id} />
              <label htmlFor="quantity" className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mr-2">
                Quantité:
              </label>
              <input
                type="number"
                name="quantity"
                value={quantity || ''}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="w-12 text-center border rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                id="quantity"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-300 to-purple-600 text-black font-semibold px-4 py-2 rounded-lg border border-gray-600 hover:scale-105 duration-200 hover:text-black hover:border-gray-800 hover:from-purple-600 hover:to-purple-300 ml-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Ajouter au panier
              </button>
            </form>
            <a
              href="/boutique"
              className="bg-custom-color hover:bg-gray-400 text-white font-semibold py-1 px-2 rounded-full text-xxs sm:text-xs md:text-sm lg:text-base xl:text-lg"
            >
              Revenir à la liste
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowBoutique;


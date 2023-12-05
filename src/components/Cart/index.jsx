import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Remarque : Assurez-vous d'avoir une structure de données similaire à celle de votre backend
const mockCartItems = [
  {
    id: 1,
    item: {
      id: 1,
      title: 'Produit 1',
      image_url: 'url_de_l_image',
      price: 10.99,
    },
    quantity: 2,
  },
  // ... Ajoutez d'autres éléments au panier si nécessaire
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Chargez le panier à partir de votre backend ici
    setCartItems(mockCartItems);
  }, []);

  const handleDeleteItem = (itemId) => {
    // Supprimez l'élément du panier ici (envoyez la requête à votre backend si nécessaire)
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleContinueShopping = () => {
    // Redirigez l'utilisateur vers la page d'accueil ou une autre page de votre choix
    navigate('/boutique');
  };

  const handleCheckout = () => {
    // Redirigez l'utilisateur vers la page de paiement ou une autre page de votre choix
    navigate('/checkout');
  };

  return (
    <section className="container mx-auto mt-10">
      <div className="flex flex-col-reverse sm:flex-row shadow-md my-10">
        <article className="w-full sm:w-3/4 bg-gray-800 px-4 py-4 sm:px-10 sm:py-10">
          {/* ... Votre contenu du panier */}
          {/* Utilisez map pour parcourir les éléments du panier */}
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <div key={cartItem.id} className="flex items-center -mx-2 px-2 sm:px-6 py-3 sm:py-5">
                {/* ... Contenu de chaque élément du panier */}
                <button
                  onClick={() => handleDeleteItem(cartItem.id)}
                  className="btn btn-danger text-white p-1"
                >
                  <i className="fa-solid fa-trash text-red-800"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="empty-cart-message text-center text-red-600 text-2xl mt-4 sm:mt-10">
              Votre panier est vide.
            </div>
          )}
          <button onClick={handleContinueShopping} className="flex font-semibold text-purple-400 text-xs sm:text-sm mt-4 sm:mt-10">
            Continuer le shopping
          </button>
        </article>

        <article id="summary" className="w-full sm:w-1/4 bg-gray-600 px-4 py-4 sm:px-8 sm:py-10">
          {/* ... Récapitulatif et bouton de paiement */}
          <button
            onClick={handleCheckout}
            className="bg-purple-400 font-semibold hover:bg-purple-300 py-2 text-xs sm:text-sm text-black uppercase w-full btn btn-primary"
            disabled={cartItems.length === 0}
          >
            Payer
          </button>
        </article>
      </div>
    </section>
  );
};

export default Cart;

import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import { useParams, useNavigate } from 'react-router-dom'; 

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const Cart = () => {
  const { cartId } = useParams(); // Utilisez useParams ici pour obtenir cartId du chemin d'accès
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    console.log('user:', user); // Vérifiez les valeurs de l'utilisateur ici
    console.log('cartId:', cartId); // Vérifiez les valeurs du cartId ici
  
    const fetchData = async () => {
      if (user.id && user.token && cartId) {
        try {
          await fetchCartDetails();
        } catch (error) {
          console.error('Error during fetchCartDetails:', error);
        }
      } else {
        console.error('User is not authenticated. Redirecting to login page.');
        navigate('/login');
      }
    };
  
    fetchData();
  }, [user.id, user.token, cartId]);

  
  const fetchCartDetails = async () => {
    try {
        console.log("cartId:", cartId);
        const response = await fetch(`${API_URL}/cart/${cartId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cartItems || []);
        setCartTotal(data.cartTotal || 0);
      } else if (response.status === 401) {
        console.error('Unauthorized. Redirecting to login page.');
        navigate('/login');
      } else {
        // Gérez les autres cas d'erreur ici
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during fetchCartDetails:', error);
    }
  };
  

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/cart/${cartId}/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        fetchCartDetails();
      } else {
        throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during handleDeleteItem:', error);
    }
  };

  const handleContinueShopping = () => {
    navigate('/boutique');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };


  return (
    <section className="container mx-auto mt-10">
      <div className="flex flex-col-reverse sm:flex-row shadow-md my-10">
        <article className="w-full sm:w-3/4 bg-gray-800 px-4 py-4 sm:px-10 sm:py-10">
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
          <button
            onClick={handleContinueShopping}
            className="flex font-semibold text-purple-400 text-xs sm:text-sm mt-4 sm:mt-10"
          >
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

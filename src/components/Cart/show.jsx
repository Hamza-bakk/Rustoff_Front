import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import { useParams, useNavigate, redirect } from 'react-router-dom';
import { useCart } from '../../context';
import { notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import "./cart.css";

// const API_URL = `${import.meta.env.VITE_BASE_URL}`;
import { API_URL } from '../../stores/apiUrl';
const stripePromise = loadStripe('pk_test_51Nd8kkD5hgWYUZtgBAR72ber6nnSecBb9WM1TPqHJDKxGJTO2AZrj0eFdQ2N4A4bH0yAP0ewS5VoOWTYSHHKYubA00lDqFS4Uh');

const Cart = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [cartItems, setCartItems] = useState([]);
  const { updateCartItemsCount } = useCart();

  const showNotification = (message, type = 'success') => {
    const config = {
      message: <span className="notification-title">Boutique Rustoff</span>,
      description: <span style={{ color: 'white' }}>{message}</span>,
      placement: 'topRight',
      style: {
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        border: '1px solid #a78bfa',
      },
      closeIcon: <CloseCircleOutlined style={{ color: 'white' }} />,
    };

    if (type === 'success') {
      notification.success(config);
    } else if (type === 'error') {
      notification.error({
        ...config,
        icon: <CloseCircleOutlined style={{ color: '#f5222d' }} />,
      });
    }
  };

  useEffect(() => {
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
  }, [user.id, cartId]);

  const fetchCartDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/${cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const userId = user.id;
        const cartItemsFromCookie = JSON.parse(Cookies.get(`cartItems_${userId}`) || '[]');
        setCartItems(cartItemsFromCookie);

      } else if (response.status === 401) {
        console.error('Unauthorized. Redirecting to login page.');
        navigate('/login');
      } else {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during fetchCartDetails:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const userId = user.id;
      const cartItemsFromCookie = JSON.parse(Cookies.get(`cartItems_${userId}`) || '[]');

      const updatedCartItemsFromCookie = cartItemsFromCookie.filter(item => item.id !== itemId);

      Cookies.set(`cartItems_${userId}`, JSON.stringify(updatedCartItemsFromCookie), { expires: 1 });

      updateCartItemsCount(updatedCartItemsFromCookie.length);

      setCartItems(updatedCartItemsFromCookie);

      fetchCartDetails();

      showNotification('L\'article a été supprimé du panier.', 'success');
    } catch (error) {
      console.error('Error during handleDeleteItem:', error);
    }
  };

  const handleContinueShopping = () => {
    navigate('/boutique');
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
  
    try {
      if (user.id && cartId) {
        const response = await fetch(`${API_URL}/checkout/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            cartItems,
            total: (cartItems.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2),
          }),
        });
  
        const sessionData = await response.json();
        console.log('Session ID received from server:', sessionData.id);
  
        if (sessionData.id) {
          const result = await stripe.redirectToCheckout({
            sessionId: sessionData.id,
          });
  
          if (result.error) {
            console.error(result.error.message);
          } else {
            const redirect = sessionData.createUrl;
            console.log('Success URL received from server:', redirect);

            window.location.href = redirect;
          }
        } else {
          console.error('Invalid session data received from server');
        }
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  
  return (
    <div className="flex flex-col rounded max-w-3xl mt-4 p-6 space-y-4 sm:p-10 bg-gray-800 text-gray-100 mx-auto my-auto">
      <h2 className="text-xl font-semibold und">Votre Panier</h2>
      <ul className="flex flex-col divide-y dark:divide-gray-700">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                  src={item.image_url}
                  alt={item.alt}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading sm:pr-8">{item.title}</h3>
                      <p className="text-sm dark:text-gray-400">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-green-600 font-semibold">{item.price}€</p>
                    </div>
                  </div>
                  <div className="flex text-sm divide-x">
                    <button type="button" className="flex items-center px-2 py-1 pl-0 text-red-500 hover:text-red-700 space-x-1" onClick={() => handleDeleteItem(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                      </svg>
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
            <div className="empty-cart-message text-center text-red-600 text-2xl mt-4 sm:mt-10">
              Votre panier est vide.
            </div>
          </li>
        )}
      </ul>
      <div className="space-y-1 text-right text-green-600 font-bold">
        <p>
          Montant Total : <span>{(cartItems.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2)} € </span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" className="px-6 py-2 border rounded-md hover:bg-gray-900 hover:text-white-900 font-semibold" onClick={handleContinueShopping}>
          Retour
          <span className="sr-only sm:not-sr-only"> à la boutique</span>
        </button>
        <button type="button" className="px-6 py-2 border rounded-md bg-violet-400 text-gray-900 hover:bg-violet-300 hover:text-white-dark:border-violet-400 font-semibold" onClick={handleCheckout}>
          <span className="">Paiement</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;

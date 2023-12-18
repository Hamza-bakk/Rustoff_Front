import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import "./order.css";

const API_URL = `${import.meta.env.VITE_BASE_URL}`;
//import { API_URL } from '../../stores/apiUrl';

const Order = () => {
  const [order, setOrder] = useState();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const userId = user.id;
        const cartItems = JSON.parse(Cookies.get(`cartItems_${userId}`) || '[]');

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            cartItems: cartItems,
          }),
        };

        const response = await fetch(`${API_URL}/checkout/order`, requestOptions);

        if (response.ok) {
          const orderDetails = await response.json();
          setOrder(orderDetails);
        } else {
          navigate('/erreur');
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des détails de la commande :', error);
        navigate('/erreur');
      }
    };

    fetchOrderDetails();
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-8">
      {order && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-4">Merci pour votre commande !</h1>
          <p>Nous avons bien reçu votre commande et nous la traitons actuellement. Vous recevrez bientôt une confirmation par e-mail.</p>
          <p className="mt-4">Pour télécharger vos produits ou voir l'historique de vos commandes, vous pouvez accéder à la page <Link to="/mescommandes" className="text-blue-500">Mes Commandes</Link>.</p>
          <p className="mt-4">Nous vous remercions de faire partie de notre communauté et espérons que vous apprécierez vos achats.</p>
        </div>
      )}
    </div>
  );
};

export default Order;

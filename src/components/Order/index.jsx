import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import "./order.css";

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

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
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
    
        };

        const response = await fetch(`${API_URL}/checkout/order`, requestOptions);

        if (response.ok) {
          setOrder(cartItems);
          console.log(cartItems);
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
    <div>
      {order ? (
        <div>
          <h1>Merci pour votre commande !</h1>
          <p>Nous avons bien reçu votre commande et nous la traitons actuellement. Vous recevrez bientôt une confirmation par e-mail.</p>
          <p>Pour suivre l'état de votre commande ou voir l'historique de vos commandes, vous pouvez accéder à la page <Link to="/mescommandes">Mes Commandes</Link>.</p>
          <p>Nous vous remercions de faire partie de notre communauté et espérons que vous apprécierez vos achats.</p>
        </div>
      ) : (
        <p>Chargement des détails de la commande...</p>
      )}
    </div>
  );
};

export default Order;

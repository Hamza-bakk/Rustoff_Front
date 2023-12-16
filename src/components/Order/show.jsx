import { useEffect, useState } from 'react';
import './order.css';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;


const ShowOrder = () => {
const [orders, setOrders] = useState([]);
const [user, setUser] = useState();
const [cartItems, setCartItems] = useState()

    useEffect(() => {
        if (user && user.id && cartItems && cartItems.length > 0) {
          const orderDetails = {
            userId: user.id,
            cartItems: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
          };
    
          fetch(`${API_URL}/oders/show`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Order saved successfully:', data);
              // Assurez-vous que la structure de données renvoyée correspond à vos attentes
              setOrders(data.orders || []);
            })
            .catch(error => {
              console.error('Error saving order:', error);
            });
        }
      }, [user, cartItems]);
    
      return (
        <div>
          <h1>Voici mes commandes !</h1>
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id}>
                {/* Affichez les détails de la commande ici */}
                <p>Commande ID: {order.id}</p>
                <p>Total: {order.total_price}</p>
                {/* Ajoutez d'autres champs de commande ici en fonction de votre modèle */}
              </div>
            ))
          ) : (
            <p>Aucune commande trouvée.</p>
          )}
        </div>
      );
    };
    
    export default ShowOrder;
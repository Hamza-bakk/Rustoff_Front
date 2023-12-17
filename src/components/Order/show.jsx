import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import './order.css';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const ShowOrder = () => {
  const [user] = useAtom(userAtom);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user.id) {
          console.log('User ID:', user.id);
          const response = await fetch(`${API_URL}/orders/${encodeURIComponent(user.id)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('API Response:', data);

            const orderItems = data.orders.map(order => order.order_items);
            setOrders(orderItems); // Use orderItems directly as it contains order item details
          } else {
            console.error('Error retrieving orders:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error retrieving orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div>
      <h1>Voici mes commandes !</h1>
      {orders.length > 0 ? (
        orders.map((orderItems, index) => (
          <div key={index}>
            <p>Commande ID: {orderItems[0].order_id}</p>
            <p>Details:</p>

              {orderItems.map(orderItem => (
                <div key={orderItem.id}>
                  <p>ID de l'Item: {orderItem && orderItem.id}</p>
                  <p>Quantité: {orderItem && orderItem.quantity}</p>
                  <p>Description: {orderItem && orderItem.description}</p>
                  <p>Prix unitaire: {orderItem.unit_price}</p>
                  <p>Prix Total: {orderItem.total_price}</p>
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>Aucune commande trouvée.</p>
      )}
    </div>
  );
};

export default ShowOrder;
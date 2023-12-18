import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import { FaRegFileImage, FaRegTrashAlt, FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import './order.css';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const ShowOrder = () => {
  const [user] = useAtom(userAtom);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [openOrderIndex, setOpenOrderIndex] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user.id) {
          const response = await fetch(`${API_URL}/orders/${encodeURIComponent(user.id)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setOrders(data.orders);
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL + "/items");
        const items = await response.json();
        setItems(items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const toggleOrderDetails = (index) => {
    setOpenOrderIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const downloadImage = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = 'item_image.jpg';
      link.target = '_blank'; // This line opens the link in a new tab/window
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Libérer l'URL de l'objet après le téléchargement
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <section className="text-white">
      <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold border-4 border-gray-500 text-black rounded inline-block mb-8 ">
          Vos Commandes :
        </h1>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="mb-4 bg-gray-800 rounded-lg overflow-hidden">
              <button
                className="flex items-center justify-between px-4 text-white py-6 w-full text-left focus:outline-none focus-visible:ri"
                onClick={() => toggleOrderDetails(index)}
              >
                <div className="flex items-center">
                  <p className="text-xl font-semibold">Commande ID: {order.id}</p>
                  <span className="ml-2">
                    {openOrderIndex === index ? (
                      <FaRegMinusSquare className="text-2xl" />
                    ) : (
                      <FaRegPlusSquare className="text-2xl" />
                    )}
                  </span>
                </div>
                <p>Prix Total: <span className="text-green-500">{order.total_price} €</span></p>
              </button>

              {openOrderIndex === index && (
                <div className="bg-gray-800 rounded-b-lg">
                  <p className="text-lg font-semibold mb-2">Details de votre commande :</p>

                  {order.order_items.map((orderItem) => {
                    const matchingItem = items.find((item) => item.id === orderItem.item_id);

                    return (
                      <div key={orderItem.id} className="mb-2">
                        <p>Quantité : <span className="text-gray-400">{orderItem.quantity}</span></p>
                        <p>Description : <span className="text-gray-400">{orderItem.description}{matchingItem && matchingItem.description}</span></p>
                        <p>Prix unitaire : <span className="text-green-500">{orderItem.unit_price} €</span></p>
                        <p>
                          Article :{' '}
                          {matchingItem && (
                            <div>
                              <img src={matchingItem.image_url} alt="Aperçu de l'image" className="mb-2 w-1/6 mx-auto" />
                              <button
                                className="text-blue-500 hover:text-blue-600 text-xl font-semibold  "
                                onClick={() => downloadImage(matchingItem.image_url)}
                              >
                                Télécharger
                              </button>
                            </div>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucune commande trouvée.</p>
        )}
      </div>
    </section>
  );
};

export default ShowOrder;



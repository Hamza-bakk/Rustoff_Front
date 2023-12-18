import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import { notification } from 'antd';
import './boutique.css';
import { useCart } from '../../context';
import { CloseCircleOutlined } from '@ant-design/icons';
import { FaTruck, FaShoppingBasket } from 'react-icons/fa';

// const API_URL = `${import.meta.env.VITE_BASE_URL}`;
import { API_URL } from '../../stores/apiUrl';

const categories = [
  'Tout',
  'Animation',
  'Logo',
  '3D',
  'Merch',
  'Tattoo',
  'Illustrations',
  'Avatars',
  'Autres',
  'Twitch',
];

const Boutique = () => {
  const [items, setItems] = useState([]);
  const [user] = useAtom(userAtom);
  const cartId = Cookies.get('cartId');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL + "/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addToCart = (item) => {
    if (user.id && user.token && cartId) {
      const userId = user.id;
      const existingCartItems = JSON.parse(Cookies.get(`cartItems_${userId}`) || '[]');
      const existingProductIndex = existingCartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (existingProductIndex >= 0) {
        const existingProduct = existingCartItems[existingProductIndex];
        showNotification(`${existingProduct.title} est déjà dans votre panier.`, 'error');
      } else {
        const newCartItem = { ...item, quantity: 1 };
        existingCartItems.push(newCartItem);
        Cookies.set(`cartItems_${userId}`, JSON.stringify(existingCartItems), { expires: 1 });
        showNotification(`${item.title} a été ajouté à votre panier.`);
        updateCartItemsCount(existingCartItems.length);
      }
    } else {
      console.error("Utilisateur non connecté ou identifiant d'utilisateur non défini");
    }
  };

  const filteredItems = selectedCategory ? items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase()) : items;

  return (
      <div className="p-4">
        <section className="container mx-auto flex items-center justify-center mt-8 titleContainer">
          <h1 className="text-3xl font-bold border-4 border-gray-500 rounded inline-block titlePortfolio">
            Boutique Rustoff
          </h1>
        </section>
        <section className="info-wrapper mb-4 sm:mb-10 flex justify-center">
          <article className="shipping-container flex items-center">
            <FaTruck className="text-gray-800 text-xl sm:text-2xl mr-2" />
            <div className="info-desc text-sm sm:text-base">Livraison Rapide</div>
          </article>
          <article className="inventory-container flex items-center ml-4 sm:ml-8">
            <FaShoppingBasket className="text-gray-800 text-xl sm:text-2xl mr-2" />
            <div className="info-desc text-sm sm:text-base">Large Choix</div>
          </article>
        </section>
        <section className="info-wrapper mb-4 sm:mb-10 flex justify-center">
          <article className="menu">
            {categories.map((category) => (
              <div
                key={category}
                className={`menu-item ${category === selectedCategory ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category === 'Tout' ? null : category)}
              >
                <div className="menu-item-title">{category}</div>
              </div>
            ))}
          </article>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-800 shadow-md mx-auto my-8">
              <div
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                onClick={() => { setShowPopup(true); setSelectedImage(item.image_url); }}
                onContextMenu={(e) => e.preventDefault()}
              >
                <img className="peer absolute top-0 right-0 h-full w-full object-cover cursor-pointer" src={item.image_url} alt={item.alt} />
              </div>
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl font-bold text-center text-violet-400">{item.title}</h5>
                <p className="text-sm text-white font-semibold text-center">{`${item.category}`}</p>
                <p className="text-sm text-white text-center">{`${item.description}`}</p>
                <div className="mt-2 mb-3">
                  <p className="text-lg font-bold text-green-500 text-center">{`€${item.price}`}</p>
                </div>
                <button onClick={() => addToCart(item)} className="w-full rounded-md border border-transparent bg-violet-400 hover:bg-violet-500 px-3 py-1.5 text-center text-sm font-medium text-black font-semibold cursor-pointer">
                  Ajouter au Panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowPopup(false)}>
            <div className="max-w-full sm:max-w-3xl bg-gray-800 p-3 rounded-md">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full h-auto rounded-md popup-image"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        )}
      </div>
  );
};

export default Boutique;

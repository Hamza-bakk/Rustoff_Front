import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import { Tabs } from 'antd';
import './boutique.css';
import { ConfigProvider } from 'antd';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const categories = [
  { category: '3d', label: '3D' },
  { category: 'avatars', label: 'Avatars' },
  { category: 'collab', label: 'Collab' },
  { category: 'illustrations', label: 'Illustrations' },
  { category: 'logo', label: 'Logo' },
  { category: 'pokemon', label: 'Pokemon' },
  { category: 'tattoo', label: 'Tattoo' },
  { category: 'twitch', label: 'Twitch' },
  { category: 'autres', label: 'Autres' },
  { category: 'merch', label: 'Merch' },
  { category: 'animation', label: 'Animation' },
  { category: 'design divers', label: 'Design Divers' },

];

const Boutique = () => {
  const [items, setItems] = useState([]);
  const [user] = useAtom(userAtom);
  const cartId = Cookies.get('cartId');
  // const setCart = useSetAtom(cartAtom);
  // const [cart] = useAtom(cartAtom);
  // const cartItems = cart.cart || [];
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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
        existingCartItems[existingProductIndex].quantity += quantity;
      } else {
        const newCartItem = { ...item, quantity: quantity };
        existingCartItems.push(newCartItem);
      }

      Cookies.set(`cartItems_${userId}`, JSON.stringify(existingCartItems), { expires: 1 });
      navigate(`/cart/${cartId}`);
    } else {
      console.error("Utilisateur non connecté ou identifiant d'utilisateur non défini");
    }
  };

  const filteredItems = selectedCategory ? items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase()) : items;

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            colorPrimary: '#a78bfa',
            colorBgContainer: '#1f2937',
            itemHoverColor: '#a78bfa', 
            colorBorderSecondary: '#1f2937',
          },
        },
        

      }}>

    <div className="p-4">
      <section className="container mx-auto flex items-center justify-center mt-8 titleContainer">
        <h1 className="text-3xl font-bold border-4 border-gray-500 rounded inline-block titlePortfolio">
          Boutique Rustoff
        </h1>
      </section>
      <Tabs
          defaultActiveKey="all"
          type="card"
          size="default"
          className="mb-4 mt-4 flex flex-wrap justify-center w-full"
          tabBarStyle={{ borderBottom: '2px solid #a78bfa', fontWeight: 'bold' }}
          onChange={(key) => {
            setSelectedCategory(key === 'all' ? null : key);
          }}
        >
        <Tabs.TabPane tab="Tout" key="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredItems.map((item) => (
              <div key={item.id} className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-800 shadow-md mx-auto my-8">
                <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" onClick={() => { setShowPopup(true); setSelectedImage(item.image_url); }}>
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
        </Tabs.TabPane>
        {categories.map((category) => (
          <Tabs.TabPane tab={category.label} key={category.category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredItems
                .filter(item => item.category.toLowerCase() === category.category.toLowerCase())
                .map((item) => (
                  <div key={item.id} className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-800 shadow-md mx-auto my-8">
                    <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" onClick={() => { setShowPopup(true); setSelectedImage(item.image_url); }}>
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
          </Tabs.TabPane>
        ))}
      </Tabs>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowPopup(false)}>
          <div className="max-w-full sm:max-w-3xl bg-gray-800 p-3 rounded-md">
            <img src={selectedImage} alt="Selected Product" className="w-full h-auto rounded-md popup-image" />
          </div>
        </div>
      )}
    </div>
    </ConfigProvider>
  );
};

export default Boutique;

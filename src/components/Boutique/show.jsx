import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom, cartAtom } from '../../stores/userAtom';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const ShowBoutique = () => {
  const { itemId } = useParams();
  const [user, userId] = useAtom(userAtom);
  const setCart = useSetAtom(cartAtom);
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/items/${itemId}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
          console.log(data);
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error);
      }
    };

    fetchData();
  }, [itemId]);

  const addToCart = () => {
    console.log('Utilisateur actuel:', user);
    console.log('Identifiant d\'utilisateur actuel:', userId);
    console.log('le Beereer est:', user.token);
  
    if (userId && user.token) {
      // Utilisez userId pour gérer les détails du panier liés à l'utilisateur
      navigate(`/cart/${userId}`);
  
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
  
        if (existingProductIndex >= 0) {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, { ...item, quantity: 1 }];
        }
      });
    } else {
      console.error('Utilisateur non connecté ou identifiant d\'utilisateur non défini');
      // Gérez le cas où l'utilisateur n'est pas connecté
    }
  };


  return (
    <section className="p-2">
      <div className="rounded-lg shadow-md overflow-hidden bg-gray-800 mt-4 mb-4 mx-2">
        <img src={item.image_url} alt={item.title} className="w-full h-auto" />
        <div className="p-3">
          <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-semibold mb-2">
            {item.title}
          </h2>
          <p className="text-white mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">{item.description}</p>
          <p className="text-green-500 font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            €{item.price}
          </p>
          <div className="mt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addToCart();
              }}
              className="flex items-center"
            >
              <input type="hidden" name="item_id" value={item.id} />
              <label htmlFor="quantity" className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mr-2">
                Quantité:
              </label>
              <input
                type="number"
                name="quantity"
                value={quantity || ''}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="w-12 text-center border rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                id="quantity"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-300 to-purple-600 text-black font-semibold px-4 py-2 rounded-lg border border-gray-600 hover:scale-105 duration-200 hover:text-black hover:border-gray-800 hover:from-purple-600 hover:to-purple-300 ml-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Ajouter au panier
              </button>
            </form>
            <a
              href="/boutique"
              className="bg-custom-color hover:bg-gray-400 text-white font-semibold py-1 px-2 rounded-full text-xxs sm:text-xs md:text-sm lg:text-base xl:text-lg"
            >
              Revenir à la liste
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowBoutique;

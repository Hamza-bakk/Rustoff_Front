import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const Boutique = () => {
    const [items, setItems] = useState([]);
  
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL + "/items");
        const data = await response.json();
        console.log('Data from API:', data);
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    useEffect(() => {
      fetchItems(); 
    }, []);

  return (
    <>
      <div className="container mx-auto text-center mt-10 sm:mt-20 mb-4 sm:mb-10">
        <h1 className="text-2xl sm:text-4xl font-bold p-2 sm:p-4 border-4 border-gray-500 rounded inline-block">
          Boutique RustOff
        </h1>
      </div>

      <section className="info-wrapper mb-4 sm:mb-10 flex justify-center">
        <article className="shipping-container flex items-center">
          <i className="fas fa-truck text-gray-800 text-xl sm:text-2xl mr-2"></i>
          <div className="info-desc text-sm sm:text-base">Livraison Rapide</div>
        </article>
        <article className="inventory-container flex items-center ml-4 sm:ml-8">
          <i className="fas fa-shopping-basket text-gray-800 text-xl sm:text-2xl mr-2"></i>
          <div className="info-desc text-sm sm:text-base">Large Choix</div>
        </article>
      </section>

      <section className="main-wrapper text-white flex flex-col-reverse sm:flex-row sm:items-start">
        <article className="menu">
          <div className="menu-item All">
            <div className="menu-item-title">All</div>
          </div>
          {/* ... Other menu items */}
        </article>

        <article className="products-container flex flex-wrap w-full ml-0 sm:ml-4" id="products-container">
          {items.map((item) => (
            <div key={item.id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-md shop-card w-full sm:w-72 mx-2 my-4 min-h-card">
              <img src={item.image_url} alt={item.alt} className="w-full h-48 object-cover object-center" />
              <div className="px-2 sm:px-4 py-2 sm:py-3">
                <h1 className="text-white font-bold text-base sm:text-sm mb-1 sm:mb-2 text-center">{item.title}</h1>
                <p className="text-white text-xs sm:text-sm text-center">{item.description}</p>
                <p className="text-green-500 font-bold text-sm sm:text-base mt-1 sm:mt-2 text-center">{`€${item.price}`}</p>
              </div>
              <Link to={`/item/${item.id}`} className="absolute bottom-0 right-0 mb-1 sm:mb-2 mr-1 sm:mr-2 bg-gradient-to-r from-purple-300 to-purple-600 text-black text-xs sm:text-sm font-bold py-1 px-2 sm:px-3 rounded-lg hover:scale-105 duration-200 hover:text-black hover:border-gray-800 hover:from-purple-600 hover:to-purple-300">
                Voir
              </Link>
            </div>
          ))}
        </article>
      </section>
    </>
  );
};

export default Boutique;


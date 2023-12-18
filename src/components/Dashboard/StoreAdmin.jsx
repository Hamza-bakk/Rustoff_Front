import { FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;
//import { API_URL } from '../../stores/apiUrl';

const StoreAdmin = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch(`${API_URL}/items`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteItem = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`${API_URL}/items/${id}`, requestOptions)
            .then(response => response.json())
            .then(() => {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            {loading && <p>Loading...</p>}
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', marginTop: '50px', textDecoration: 'underline', fontWeight: 'bold' }}>Liste des Produits en Boutique :</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className="relative bg-white rounded-lg overflow-hidden shadow-md">
                        <img src={item.image_url} alt={item.alt} className="w-full h-52 object-cover object-center" />
                        <div className="px-4 py-3 bg-black">
                            <h3 className="text-white font-extrabold text-sm mb-2 text-center">{item.title}</h3>
                            <p className="text-white text-xs font-bold text-center">{item.description}</p>
                            <p className="text-white text-xs font-bold mt-5 text-center">{item.category}</p>

                            <p className="text-green-500 font-bold font-bold text-sm mt-2 text-center">{item.price} €</p>
                        </div>

                        <button
                            className="absolute bottom-0 right-0 mb-2 mr-2 text-red-700 hover:text-red-500"
                            aria-label="Supprimer l'élément"
                            onClick={() => handleDeleteItem(item.id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreAdmin;

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const ProductsAdmin = () => {
    const initialFormData = {
        title: '',
        description: '',
        category: '',
        price: 0,
        image_url: '',
        alt: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        };

        fetch(`${API_URL}/items`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Item created successfully:', data);
                toast.success('Item ajouté avec succès', { position: toast.POSITION.TOP_RIGHT });
                setFormData(initialFormData); // Réinitialise le formulaire
            })
            .catch(error => {
                console.error('Error creating item:', error);
                toast.error('Erreur lors de la création de l\'article', { position: toast.POSITION.TOP_RIGHT });
            });
    };

    return (
        <section className="max-w-screen-xl p-4 sm:p-6 mx-auto mt-10">
            <div className="flex justify-center">
                <div className="w-full sm:w-1/2 bg-black p-4 sm:p-6 rounded-lg shadow-lg mt-10">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <h1 className="text-purple-400 font-extrabold text-center underline mb-2 text-3xl">Ajouter un article</h1>
                            <label htmlFor="title" className="text-sm mb-2 font-bold text-white">Titre</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-gray-700 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="text-sm mb-2 font-bold text-white">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-gray-700 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="text-sm mb-2 font-bold text-white">Catégorie de l'élément</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="bg-gray-700 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Sélectionne une catégorie</option>
                                <option value="3D">3D</option>
                                <option value="Animation">Animation</option>
                                <option value="Logo">Logo</option>
                                <option value="Twitch">Twitch</option>
                                <option value="Merch">Merch</option>
                                <option value="Tattoo">Tattoo</option>
                                <option value="Design Divers">Design Divers</option>
                                <option value="Avatars">Avatars</option>
                                <option value="Autres">Autres</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="text-sm font-bold mb-2 text-white">Prix</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                step="any"
                                value={formData.price}
                                onChange={handleChange}
                                className="bg-gray-700 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image_url" className="text-sm font-bold mb-2 text-white">Image URL</label>
                            <input
                                type="text"
                                id="image_url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                className="bg-gray-700 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="alt" className="text-sm font-bold mb-2 text-white">Alt : Description de l'image</label>
                            <input
                                type="text"
                                id="alt"
                                name="alt"
                                value={formData.alt}
                                onChange={handleChange}
                                className="bg-gray-700 border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        
                        <div className="text-center">
                            <button type="submit" className="bg-purple-400 hover:bg-purple-300 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Ajouter le produit
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </section>
    );
};

export default ProductsAdmin;

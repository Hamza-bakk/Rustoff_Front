import { useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css'

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

function Login() {
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        Cookies.set('token', response.headers.get('Authorization'));
        Cookies.set('id', data.user.id);
  
        const cartId = data.user.cartId;
  
        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          token: response.headers.get('Authorization'),
          id: data.user.id,
          cartId: cartId,
        }));
  
        // Afficher une alerte de succès
        toast.success('Connexion réussie !', { autoClose: 3000 });

        navigate('/');
        console.log('Authentification réussie');
        console.log(`L'id de l'utilisateur est ${data.user.id}`);
        console.log(response.headers.get('Authorization'));
      } else {
        setError('Identifiants invalides');
      }
    } catch (error) {
      setError('Une erreur s\'est produite');
    }
  };
  
  return (
    <div className="form-container">
      <div className="p-8 rounded  w-full max-w-md">
        <h2 className="text-2xl text-center font-bold mb-6">Se connecter :</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
              
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Se connecter
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
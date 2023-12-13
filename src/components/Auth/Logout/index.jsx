import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, cartAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { message } from 'antd';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

function LogoutButton() {
  const [user] = useAtom(userAtom);
  const [ ,setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [cartId] = useAtom(cartAtom);
 

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/users/sign_out`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        setUser({
          id: null,
          isLoggedIn: false,
          token: null,
          cartId: null,
          isAdmin: false,
        });

        // Supprime les cookies
        Cookies.remove('token');
        Cookies.remove('id');
        navigate('/');

        // Affiche une notification de déconnexion réussie
        message.success('Déconnexion réussie !');
      } else {
        // Gérer les erreurs de déconnexion
        const data = await response.json();
        message.error(data.message || 'Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la déconnexion', error);
      message.error('Une erreur s\'est produite lors de la déconnexion');
    }
  };

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté au chargement de la page
    const token = Cookies.get('token');
    const id = Cookies.get('id');

    if (token && id) {
      setUser({
        id,
        isLoggedIn: true,
        token,
        cartId,
      });
    }
  }, [setUser]);

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-white ml-2"
    >
      <FiLogOut />
      <span>Déconnexion</span>
    </button>
  );
}

export default LogoutButton;

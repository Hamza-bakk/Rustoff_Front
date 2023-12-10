import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { message } from 'antd';

function LogoutButton() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });
    // Supprime les cookies
    Cookies.remove('token');
    Cookies.remove('id');
    navigate('/');
    
    // Affiche une notification de déconnexion réussie
    message.error('Déconnexion réussie !');

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

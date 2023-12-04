import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    
    // Affiche une alerte de déconnexion réussie
    toast.error('Déconnexion réussie!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
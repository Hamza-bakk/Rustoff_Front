import { useState, useEffect } from 'react';
import BannerProfile from '../../assets/images/illustrations/jap.png';
import Avatar from '../../assets/images/rust.png';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { notification } from 'antd';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const Profile = () => {
  const [user, setUser] = useState({});
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = Cookies.get('token');

        if (!userId || !authToken) {
          console.error('ID utilisateur ou token non disponible lors de la récupération du profil');
          return;
        }

        const response = await fetch(`${API_URL}/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.error('La réponse n\'est pas au format JSON');
            }
          } catch (jsonError) {
            console.error('Erreur lors de la conversion de la réponse en JSON:', jsonError);
          }
        } else {
          console.error('Erreur lors de la récupération du profil utilisateur:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleUpdateEmail = async () => {
    try {
      const authToken = Cookies.get('token');

      if (!userId || !authToken || !newEmail) {
        console.error('ID utilisateur, token ou nouvel email non disponibles lors de la mise à jour de l\'email');
        return;
      }
      const response = await fetch(`${API_URL}/profiles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ user: { email: newEmail } }),
      });

      if (response.ok) {
        console.log('Email mis à jour avec succès');
        openNotification('success', 'Email mis à jour avec succès'); // Affiche la notification de succès
        // Tu peux également mettre à jour localement l'email dans l'état si nécessaire
      } else {
        console.error('Erreur lors de la mise à jour de l\'email:', response.statusText);
        openNotification('error', 'Erreur lors de la mise à jour de l\'email'); // Affiche la notification d'erreur
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'email:', error);
      openNotification('error', 'Erreur lors de la mise à jour de l\'email'); // Affiche la notification d'erreur
    }
  };

  const handleDeleteUser = async () => {
    try {
      const authToken = Cookies.get('token');
      
      if (!userId || !authToken) {
        console.error('ID utilisateur ou token non disponible lors de la suppression de l\'utilisateur');
        return;
      }
  
      // Utiliser window.confirm pour demander confirmation
      const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');
  
      if (!isConfirmed) {
        return; // Annuler la suppression si l'utilisateur n'a pas confirmé
      }
  
      console.log('ID utilisateur à supprimer :', userId);
  
      // Mise à jour de l'état local de l'utilisateur
      setUser((prevUser) => ({
        ...prevUser,
        isLoggedIn: false,  // Marquer l'utilisateur comme déconnecté
      }));
  
      const response = await fetch(`${API_URL}/profiles/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.ok) {
        console.log("Compte supprimé avec succès");
  
        // Déconnexion côté Frontend (suppression du cookie)
        Cookies.remove('token');
  
        // Forcer le rafraîchissement de la page
        window.location.reload();
      } else {
        console.error('Erreur lors de la suppression du compte utilisateur:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du compte utilisateur:', error);
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-8 bg-gray-800 shadow-xl rounded-lg text-gray-900">
      <article className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src={BannerProfile} alt="Mountain" />
      </article>
      <article className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt="Avatar de l'utilisateur" className="object-cover object-center h-32 w-32" />
        ) : (
          <img src={Avatar} alt="Avatar par défaut" className="object-cover object-center h-32 w-32" />
        )}
      </article>
      <article className="text-center mt-2">
        <h2 className="mt-2 font-bold text-white">{user.email}</h2>
      </article>
      <article className="p-4 mt-2 flex flex-wrap justify-center gap-4">
        <div>
          <a href="/edit-profile" className="bg-purple-400 hover:bg-purple-300 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">
            Modifier le profil
          </a>
        </div>
        <div>
          <a href={`/edit-password/${userId}`} className="bg-purple-400 hover:bg-purple-300 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">
            Modifier le Mot de passe
          </a>
        </div>
        <div>
          <a href={`/mescommandes`} className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Mes Commandes</a>
        </div>
        <div>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Supprimer mon compte
          </button>
        </div>
      </article>
      {/* Formulaire de mise à jour d'email */}
      <article className="p-4 mt-2">
        <input
          type="email"
          placeholder="Nouvel email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="bg-gray-100 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleUpdateEmail}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Mettre à jour l'email
        </button>
      </article>
    </section>
  );
};

export default Profile;

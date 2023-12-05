import { useState, useEffect } from 'react';
import { API_URL } from "../../stores/apiUrl";
import BannerProfile from '../../assets/images/illustrations/jap.png';
import Avatar from '../../assets/images/rust.png';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(API_URL + "/profiles/id");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const deleteUser = async () => {
    try {
      const response = await fetch(API_URL + "/profiles/id", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez les en-têtes nécessaires, par exemple, le jeton d'authentification
          Authorization: `Bearer ${user.token}`, // Assurez-vous que le token est accessible depuis l'objet user
        },
      });

      if (response.ok) {
        // Suppression réussie, effectuez les actions nécessaires (par exemple, redirigez l'utilisateur vers la page de déconnexion)
        console.log("Account deleted successfully");
      } else {
        // Gérez les erreurs de suppression du compte
        console.error("Error deleting user account:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
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
          <a href="/edit-profile" className="bg-purple-400 hover:bg-purple-300 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Modifier le profil</a>
        </div>
        <div>
          <a href="/edit-user-registration" className="bg-purple-400 hover:bg-purple-300 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Modifier le Mot de passe</a>
        </div>
        <div>
          <a href="/orders" className="bg-gray-500 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Mes Commandes</a>
        </div>
        <div>
          <button onClick={() => confirm("Are you sure?") && deleteUser()} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline delete-account-button">Supprimer mon compte</button>
        </div>
      </article>
    </section>
  );
};

export default Profile;

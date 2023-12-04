import { Link } from 'react-router-dom';

import { userAtom } from '../../stores/userAtom';
import {useAtom} from 'jotai'

import LogoutButton from '../Auth/Logout';

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-white">
          ImmoCoin
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline text-white">
            Les biens
          </Link>
          {userInfo.isLoggedIn ? (
            <>
              <Link
                to={`/myproperties/${userInfo.id}`}
                className="hover:underline"
              >
                Profil
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline text-white">
                S'inscrire
              </Link>
              <Link to="/login" className="hover:underline text-white">
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import LogoutButton from '../Auth/Logout';
import logo from '../../assets/rust.png';

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="flex items-center mb-4 lg:mb-0">
          <img src={logo} className="h-12 w-auto mr-2" alt="immocoin Logo" />
          <Link to="/" className="font-bold text-xl text-white no-underline">
            RustOff
          </Link>
        </div>
        <div className="flex items-center text-center lg:flex-1 lg:justify-center ">
          <Link to="/boutique" className="text-white hover:underline font-bold mx-4 lg:mx-0 no-underline">
            Boutique
          </Link>
          <Link to="/portfolio" className="hover:underline font-bold text-white mx-4 lg:mx-0 no-underline">
            Portfolio
          </Link>
          <Link to="/faq" className="hover:underline font-bold text-white mx-4 lg:mx-0 no-underline">
            FAQ
          </Link>
        </div>
        <div className="flex items-center text-center lg:space-x-4 ">
          {userInfo.isLoggedIn ? (
            <>
              <Link
                to={`/myproperties/${userInfo.id}`}
                className="hover:underline font-bold no-underline text-violet-500"
              >
                Mon Profil
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline text-white no-underline">
                S'inscrire
              </Link>
              <Link to="/login" className="hover:underline text-white no-underline">
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

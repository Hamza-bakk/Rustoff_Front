import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import LogoutButton from '../Auth/Logout';
import logo from '../../assets/rust.png';
import { FaBars, FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);
  console.log('ueserInfoNav' , userInfo)
  const navigate = useNavigate();


  const handleCartClick = () => {
    navigate('/cart/${userId}');
  };

  const handleProfileClick = () => {
    navigate('/profiles/id');
  };

  return (
    <nav className="bg-gray-800 top-0 left-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <div className="sm:hidden" id="mobile-menu-button">
              <button aria-controls="mobile-menu" className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
                <FaBars className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <img className="h-8 w-auto" src={logo} alt="RustOff Logo" />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {userInfo.isLoggedIn && userInfo.isAdmin && (
                  <Link to="/dashboard" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
                    Dashboard
                  </Link>
                )}
                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">
                  Accueil
                </Link>
                <Link to="/boutique" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Boutique
                </Link>
                <Link to="/portfolio" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Portfolio
                </Link>
                <Link to="/faq" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {userInfo.isLoggedIn ? (
              <>
                <FaShoppingCart className="text-gray-300 text-2xl mr-4 cursor-pointer" onClick={handleCartClick} />
                <Link to={`/profiles/${userInfo.id}`} onClick={handleProfileClick} className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Mon Profil
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  S'inscrire
                </Link>
                <Link to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {userInfo.isLoggedIn && userInfo.isAdmin && (
            <Link to="/dashboard" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
              Dashboard
            </Link>
          )}
          <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">
            Accueil
          </Link>
          <Link to="/boutique" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            Boutique
          </Link>
          <Link to="/portfolio" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            Portfolio
          </Link>
          <Link to="/faq" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

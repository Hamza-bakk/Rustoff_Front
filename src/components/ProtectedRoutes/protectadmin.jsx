import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoutesAdmin = ({ children }) => {
  const [user] = useAtom(userAtom);

  // Vérifiez si l'utilisateur est connecté et s'il est administrateur
  if (!user.isLoggedIn || !user.isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutesAdmin;

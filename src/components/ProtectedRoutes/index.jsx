import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const [user] = useAtom(userAtom);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }


  return children;
};


export default ProtectedRoutes;
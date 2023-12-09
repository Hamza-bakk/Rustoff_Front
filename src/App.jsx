import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './stores/userAtom';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import NewPassword from './pages/Auth/NewPassword';
import AuthSuccess from './pages/Auth/AuthSuccess';
import LogoutSuccess from './pages/Auth/LogoutSuccess';
import Home from './pages/Home';
import Boutiques from "./pages/Boutiques/index";
import ShowBoutique from './components/Boutique/show';
import Portfolio from './pages/Portfolio';
import Cart from './components/Cart/index';
import LegalSection from './components/Footer/LegalSection';
import PrivacyPolicySection from './components/Footer/PrivacyPolicySection';
import RefundPolicySection from './components/Footer/RefundPolicySection';
import Faq from './pages/Faq/';
import Profile from './pages/Profile/';
import Quotes from './pages/Quotes/';

// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';

// Admin Dashboard
import Admin from './pages/Admin/admin';
import Sidebar from './components/Dashboard/SideBar';
import Settings from './components/Dashboard/Settings';
import Users from './components/Dashboard/Users';


// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <ToastContainer />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setUser({
        isLoggedIn: true,
        token: token,
      });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout><Home /></MainLayout>}
        />
        <Route
          path="/boutique"
          element={<MainLayout><Boutiques /></MainLayout>}
        />
        <Route
          path="/cart/:userId"
          element={<MainLayout><Cart /></MainLayout>}
        />
        <Route
          path="/item/:itemId"
          element={<MainLayout><ShowBoutique /></MainLayout>}
        />
        <Route
          path="/register"
          element={<MainLayout><Register /></MainLayout>}
        />
        <Route
          path="/login"
          element={<MainLayout><Login /></MainLayout>}
        />
        <Route
          path="/newpassword"
          element={<MainLayout><NewPassword /></MainLayout>}
        />
        <Route
          path="/authsuccess"
          element={<MainLayout><AuthSuccess /></MainLayout>}
        />
        <Route
          path="/logoutsuccess"
          element={<MainLayout><LogoutSuccess /></MainLayout>}
        />
        <Route
          path="/mentions-legales"
          element={<MainLayout><LegalSection /></MainLayout>}
        />
        <Route
          path="/politique-confidentialite"
          element={<MainLayout><PrivacyPolicySection /></MainLayout>}
        />
        <Route
          path="/politique-remboursement"
          element={<MainLayout><RefundPolicySection /></MainLayout>}
        />
        <Route
          path="/faq"
          element={<MainLayout><Faq /></MainLayout>}
        />
        <Route
          path="/portfolio"
          element={<MainLayout><Portfolio /></MainLayout>}
        />
        <Route
          path="/profiles/:userId"
          element={<MainLayout><Profile /></MainLayout>}
        />
        <Route
          path="/quotes"
          element={<MainLayout><Quotes /></MainLayout>}
        />

        {/* Route Admin */}
        <Route
          path="/admin/*"
          element={
            <div style={{display : 'flex'}}>
              <Sidebar />
              {/* Main Content */}
              <div className="flex-1 p-4" >
                <Routes>
                  <Route
                    index
                    element={<Admin />}
                  />
                  <Route
                    path="settings"
                    element={<Settings />}
                  />
                  <Route
                    path="users"
                    element={<Users />}
                  />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

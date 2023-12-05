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
import Carts from './components/Cart/index';
import LegalSection from './components/Footer/LegalSection';
import PrivacyPolicySection from './components/Footer/PrivacyPolicySection';
import RefundPolicySection from './components/Footer/RefundPolicySection';
import Faq from './pages/Faq/';


// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';


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
    <>
    <div className="flex flex-col min-h-screen">
      <Router>
        <NavBar />
        <ToastContainer />
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/boutique" element={<Boutiques/>}/>
            <Route path="/cartitems" element={<Carts/>}/>
            <Route path="/item/:itemId" element={<ShowBoutique />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/newpassword" element={<NewPassword/>} />
            <Route path="/authsuccess" element={<AuthSuccess/>} />
            <Route path="/logoutsuccess" element={<LogoutSuccess/>} />
            <Route path="/mentions-legales" element={<LegalSection />} />
            <Route path="/politique-confidentialite" element={<PrivacyPolicySection />} />
            <Route path="/politique-remboursement" element={<RefundPolicySection />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  </>
);
}
  
  export default App;
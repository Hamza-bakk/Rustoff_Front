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
import Portfolio from './pages/portfolio';
import ShowProperty from './components/Properties/show';
import MyProperties from './pages/MyProperties';
import CreateProperty from './pages/MyProperties/create';
import UpdateProperty from './pages/MyProperties/update';
import Boutiques from "./pages/Boutiques/index";
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
      <Router>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/property/:id" element={<ShowProperty/>}/>
          <Route path="/boutique" element={<Boutiques/>}/>
          <Route path="/myproperties/:id" element={<MyProperties/>}/>
          <Route path="/createproperty" element={<CreateProperty/>}/>
          <Route path="updateproperty/:id" element={<UpdateProperty/>}/>
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
      </Router>

    </>
  );
}

export default App;

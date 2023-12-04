import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAtom } from 'jotai';
import { userAtom } from "./stores/userAtom";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import NewPassword from './pages/Auth/NewPassword'
import AuthSuccess from './pages/Auth/AuthSuccess'
import LogoutSuccess from './pages/Auth/LogoutSuccess'
import Home from './pages/Home';
import ShowProperty from './components/Properties/show';
import MyProperties from './pages/MyProperties';
import CreateProperty from './pages/MyProperties/create';
import UpdateProperty from './pages/MyProperties/update';

//components
import NavBar from './components/Navbar'


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
          <Route path="/myproperties/:id" element={<MyProperties/>}/>
          <Route path="/createproperty" element={<CreateProperty/>}/>
          <Route path="updateproperty/:id" element={<UpdateProperty/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/newpassword" element={<NewPassword/>} />
          <Route path="/authsuccess" element={<AuthSuccess/>} />
          <Route path="/logoutsuccess" element={<LogoutSuccess/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App

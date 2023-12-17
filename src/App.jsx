import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './stores/userAtom';
import Cookies from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import NewPassword from './pages/Auth/NewPassword';
import Home from './pages/Home';
import Boutiques from './pages/Boutiques/index';
import ShowBoutique from './components/Boutique/show';
import Portfolio from './pages/Portfolio';
import Cart from './components/Cart/show';
import Order from './components/Order';
import LegalSection from './components/Footer/LegalSection';
import PrivacyPolicySection from './components/Footer/PrivacyPolicySection';
import RefundPolicySection from './components/Footer/RefundPolicySection';
import Faq from './pages/Faq/';
import Profile from './pages/Profile/';
import Quotes from './pages/Quotes/';
import { CartProvider } from './context';

// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoutes';
import ProtectedRouteAdmin from './components/ProtectedRoutes/protectadmin';

// Admin Dashboard
import Admin from './pages/Admin/admin';
import Sidebar from './components/Dashboard/SideBar';
import QuotesAdmin from './components/Dashboard/QuotesAdmin';
import UsersAdmin from './components/Dashboard/UsersAdmin';
import OrdersAdmin from './components/Dashboard/OrdersAdmin';
import StoreAdmin from './components/Dashboard/StoreAdmin';
import ProductsAdmin from './components/Dashboard/ProductsAdmin';
import ShowOrder from './components/Order/show';

// eslint-disable-next-line react/prop-types
function MainLayout({ children }) {
  const location = useLocation();

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      alert('Dommage bien essayé !');
    };

    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('contextmenu', handleContextMenu);
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('contextmenu', handleContextMenu);
      });
    };
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <ToastContainer />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

const stripePromise = loadStripe(import.meta.env.REACT_APP_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch('/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

function App() {
  const [, setUser] = useAtom(userAtom);
  // const [cartId] = useAtom(cartAtom);

  useEffect(() => {
    const token = Cookies.get('token');
    const cartId = Cookies.get('cartId');
    const isAdmin = Cookies.get('isAdmin') === 'true'; // Convertissez la chaîne en booléen

    if (token) {
      setUser({
        isLoggedIn: true,
        isAdmin: isAdmin,
        token: token,
        cartId: cartId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartProvider>
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
          path="/cart/:cartId"
          element={<MainLayout><Cart /></MainLayout>}
        />

        <Route
          path="/order"
          element={<MainLayout><Order /></MainLayout>}
        />

        <Route
          path="/mescommandes"
          element={<MainLayout><ShowOrder /></MainLayout>}
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
            path="/edit-password/:userId"
            element={<MainLayout><NewPassword /></MainLayout>}
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
          element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>}
        />
          <Route
            path="/quotes"
            element={<ProtectedRoute><MainLayout><Quotes /></MainLayout></ProtectedRoute>}
          />

          {/* Route Admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRouteAdmin>
                <div style={{ display: 'flex' }}>
                  <Sidebar />
                  {/* Main Content */}
                  <div className="flex-1 p-4" >
                    <Routes>
                      <Route
                        index
                        element={<Admin />}
                      />
                      <Route
                        path="quotes"
                        element={<QuotesAdmin />}
                      />
                      <Route
                        path="users"
                        element={<UsersAdmin />}
                      />
                      <Route
                        path="orders"
                        element={<OrdersAdmin />}
                      />
                      <Route
                        path="store"
                        element={<StoreAdmin />}
                      />
                      <Route
                        path="products"
                        element={<ProductsAdmin />}
                      />
                    </Routes>
                  </div>
                </div>
              </ProtectedRouteAdmin>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

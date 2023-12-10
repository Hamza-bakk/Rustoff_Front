import { Menu, ConfigProvider, Divider} from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/rust.png';
import { FaUsers } from "react-icons/fa";
import { HiPencilSquare } from "react-icons/hi2";
import { FaImage } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";



const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link to={'./'}>
      Dashboard
    </Link>,
    'admin',
    <LuLayoutDashboard />,
  ),
  getItem(
    <Link to={'./users'}>
      Utilisateurs
    </Link>,
    'users',
    <FaUsers />,
  ),
  getItem(
    <Link to={'./quotes'}>
      Devis
    </Link>,
    'quotes',
    <HiPencilSquare />,
  ),
  getItem(
    <Link to={'./products'}>
      Produits
    </Link>,
    'products',
    <FaImage />,
  ),
  getItem(
    <Link to={'./orders'}>
      Commandes
    </Link>,
    'orders',
    <FaFileInvoiceDollar />
,
  ),
  getItem(
    <Link to={'./store'}>
      Boutiques
    </Link>,
    'store',
    <FaStore />,
  ),
  getItem(
    <Divider />
  )
];


const SideBar = () => {

  return (

    <ConfigProvider  theme={{
        components: {  
          Menu: {
            algorithm: true,
            darkItemBg : "#000",
            darkItemColor : '#fff',
            colorPrimary: '#808080',
          },
        },
      }}>
        <div style={{width : '10vw', background: '#000'}}>
          <div className="imgContainer" style={{display : 'flex' , alignContent : 'center' , justifyContent : 'center' }} >
            <Link to={'/'}>
              <img src={Logo} style={{width : '8vw'}}></img>
            </Link>
          </div>
          <div className="dividerContainer" style={{padding : '0 1vw' }}>
            <Divider style={{background : '#fff'}} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} style={{ minHeight: "100vh", maxWidth: '10vw' }} />
        </div>

    </ConfigProvider>
  

  );
};
export default SideBar;
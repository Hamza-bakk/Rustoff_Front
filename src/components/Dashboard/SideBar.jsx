import React from 'react';
import { Menu, ConfigProvider, Divider, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/rust.png';
import { FaUsers } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import { FaImage } from 'react-icons/fa6';
import { FaStore } from 'react-icons/fa6';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { LuLayoutDashboard } from 'react-icons/lu';

const getItem = (label, key, icon, children, description) => {
  return {
    key,
    icon,
    children,
    label,
    description,
  };
};

const items = [
  getItem(<Link to={'./'}>Dashboard</Link>, 'admin', <LuLayoutDashboard />, null, 'Stats général et 24h'),
  getItem(<Link to={'./users'}>Utilisateurs</Link>, 'users', <FaUsers />, null, 'Liste des utilisateurs'),
  getItem(<Link to={'./quotes'}>Devis</Link>, 'quotes', <HiPencilSquare />, null, 'Gérer des devis'),
  getItem(<Link to={'./products'}>Produits</Link>, 'products', <FaImage />, null, 'Ajouts de produits'),
  getItem(<Link to={'./orders'}>Commandes</Link>, 'orders', <FaFileInvoiceDollar />, null, 'Liste Commandes'),
  getItem(<Link to={'./store'}>Boutiques</Link>, 'store', <FaStore />, null, 'Liste Produits'),
  getItem(<Divider />),
];

const SideBar = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            algorithm: true,
            darkItemBg: '#000',
            darkItemColor: '#fff',
            colorPrimary: '#808080',
          },
        },
      }}
    >
      <div className="bg-black p-4 md:p-8">
        <div className="imgContainer flex items-center justify-center mb-4">
          <Link to={'/'}>
            <img src={Logo} style={{ width: '8vw' }} alt="Logo" />
          </Link>
        </div>
        <h1 className="font-bold text-lg lg:text-2xl ml-2 md:ml-6 bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
          Dashboard<span className="text-indigo-400">.</span>
        </h1>
        <p className="text-slate-400 text-sm mb-2 ml-2 md:ml-6">Admin,</p>
        <div className="dividerContainer" style={{ padding: '0 1vw' }}>
          <Divider style={{ background: '#fff' }} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ minHeight: '100vh', maxWidth: '100%' }}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ minHeight: '40px' }}>
              <Tooltip title={item.description} placement="right">
                {item.label}
              </Tooltip>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </ConfigProvider>
  );
};

export default SideBar;

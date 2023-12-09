import {PieChartOutlined,} from '@ant-design/icons';
import { Menu, ConfigProvider, Divider} from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/rust.png';



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
    <Link to={'./users'}>
      Users
    </Link>,
    'users',
    <PieChartOutlined />,
  ),
  getItem(
    <Link to={'./settings'}>
      Settings
    </Link>,
    'settings',
    <PieChartOutlined />,
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
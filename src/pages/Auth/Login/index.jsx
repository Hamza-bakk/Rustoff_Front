import { Button, Checkbox, Form, Input, message } from 'antd';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import logo from '../../../assets/rust.png';
import './login.css';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const LoginForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
 



  const handleLogin = async (values) => {
    try {
      const response = await fetch(`${API_URL}/users/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: values.email,
            password: values.password,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get('Authorization'));
        Cookies.set('id', data.user.id);
        Cookies.set('cartId', data.cartId);

        const isAdmin = data.user.admin || false;

        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          token: response.headers.get('Authorization'),
          id: data.user.id,
          cartId: data.cartId,
          isAdmin: isAdmin,
          test: 'test',
        }));

        // Afficher un message de succès
        message.success('Connexion réussie !');

        navigate('/');
        console.log('Authentification réussie');
        console.log(`L'id de l'utilisateur est ${data.user.id}`);
        console.log(response.headers.get('Authorization'));
        console.log(`L'id de Cart est ${data.cartId}`);
        console.log('data:', data); // Ajoutez ce log pour vérifier la structure de l'objet data
      } else {
        // Afficher un message d'erreur
        message.error('Identifiants invalides');
      }
    } catch (error) {
      // Afficher un message d'erreur
      message.error('Une erreur s\'est produite');
    }
  };

  return (
<div className="flex items-center justify-center h-screen">
    <div className="bg-gray-800 rounded-md max-w-md mx-auto p-8">
      <img src={logo} alt="Logo" className="w-35 h-16 mx-auto mb-4" />
      <h2 className="font-extrabold text-2xl text-violet-400 text-center mb-4">Se Connecter</h2>

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Merci de mettre votre email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Merci de mettre votre mot de!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder="Mot de Passe"
          />
        </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="text-white">Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot text-white" href="">
          Mot de passe perdu ?
        </a>
      </Form.Item>

      <Form.Item>
      <Button type="" htmlType="submit" className="login-form-button font-bold bg-violet-400 hover:bg-violet-300">
        Connexion
      </Button>
        <a href="/register" className="text-white">Ou Inscrit toi !</a>
      </Form.Item>
    </Form>
  </div>
</div>
);
      }

      export default LoginForm
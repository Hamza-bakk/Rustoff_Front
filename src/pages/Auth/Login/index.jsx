import { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { userAtom, cartAtom } from '../../../stores/userAtom';
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
            email: values.username,
            password: values.password,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();

        Cookies.set('token', response.headers.get('Authorization'));
        Cookies.set('id', data.user.id);
        Cookies.set('cartId', response.data.id);

        const cartId = data.user.cartId;
        const isAdmin = data.user.admin || false;

        setUser((prevUser) => ({
          ...prevUser,
          isLoggedIn: true,
          token: response.headers.get('Authorization'),
          id: data.user.id,
          cartId: response.data.cartId,
          isAdmin: isAdmin,
          test: 'test',
        }));

        // Afficher un message de succès
        message.success('Connexion réussie !');

        navigate('/');
        console.log('Authentification réussie');
        console.log(`L'id de l'utilisateur est ${data.user.id}`);
        console.log(response.headers.get('Authorization'));
        console.log(`L'id de Cart est ${response.cartId}`);
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
    <div className="bg-gray-800 rounded-md max-w-md mx-auto mt-20 p-8">
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
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            placeholder="Password"
          />
        </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox className="text-white">Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot text-white" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
      <Button type="" htmlType="submit" className="login-form-button bg-violet-400 hover:bg-violet-300">
        Log in
      </Button>
        <a href="/register" className="text-white">Or register now!</a>
      </Form.Item>
    </Form>
  </div>
);
      }

      export default LoginForm
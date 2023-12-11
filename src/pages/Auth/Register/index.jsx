import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import logo from '../../../assets/rust.png';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const Register = () => {
  const [, setUser] = useAtom(userAtom);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setError('');

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: values.email,
            password: values.password,
            password_confirmation: values.password_confirmation,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
      
        const authToken = response.headers.get('Authorization');
        const userId = data.user.id;
        const cartId = data.cartId;

        Cookies.set('token', authToken);
        Cookies.set('id', userId);
        Cookies.set('cartId', cartId);
          
          setUser({
            isLoggedIn: true,
            token: authToken,
            id: userId,
            cartId: cartId,
          });

          message.success('Compte créé avec succès. Connecté !');

          navigate('/');
          
      } else {
        setError('Erreur lors de la création du compte');
      }
    } catch (error) {
      setError('Une erreur s\'est produite lors de la création du compte');
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-md max-w-md mx-auto mt-20 p-8">
      <img src={logo} alt="Logo" className="w-35 h-16 mx-auto mb-4" />
      <Form
        name="register-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        className="login-form"
      >
        <h2 className="font-extrabold text-2xl text-violet-400 text-center mb-4">Créer un compte</h2>
        {error && <p className="text-red-500">{error}</p>}
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'L\'email n\'est pas valide',
            },
            {
              required: true,
              message: 'Veuillez entrer votre email',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Veuillez entrer votre mot de passe',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mot de passe" />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          rules={[
            {
              required: true,
              message: 'Veuillez confirmer votre mot de passe',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirmer le mot de passe" />
        </Form.Item>
        <Form.Item>
          <Button type="" htmlType="submit" className="login-form-button font-bold bg-violet-400 hover:bg-violet-300">
            Créer un compte et se connecter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAtom } from 'jotai';
import { userAtom } from '../../../stores/userAtom';
import { useNavigate, useParams } from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import logo from '../../../assets/rust.png';
import Cookies from 'js-cookie';

// const API_URL = `${import.meta.env.VITE_BASE_URL}`;

import { API_URL } from '../../../stores/apiUrl';


const NewPassword = () => {
  const [user, setUser] = useAtom(userAtom);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const loggedInUserId = Cookies.get('user_id');
    if (loggedInUserId && Number(userId) !== Number(loggedInUserId)) {
      message.error("Vous n'êtes pas autorisé à effectuer cette action.");
      navigate('/');
    }
  }, [userId, navigate]);

  const onFinish = async (values) => {
    form.resetFields();
    setLoading(true);

    try {
      const loggedInToken = Cookies.get('token');
      const response = await fetch(`${API_URL}/users/edit_password/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loggedInToken}`,
        },
        body: JSON.stringify({
          user: {
            current_password: values.currentPassword,
            new_password: values.newPassword,
            password_confirmation: values.confirmPassword,
          },
        }),
      });

      if (response.ok) {
        console.log('Mot de passe modifié avec succès. Veuillez vous reconnecter.');
        message.success('Mot de passe modifié avec succès. Veuillez vous reconnecter.');

        setUser({});
        Cookies.remove('token');
        Cookies.remove('user_id');

        navigate('/');
      } else {
        const data = await response.json();
        message.error(data.message || 'Erreur lors de la modification du mot de passe');
      }
    } catch (error) {
      message.error('Une erreur s\'est produite lors de la modification du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-md max-w-md mx-auto mt-32 p-8">
      <img src={logo} alt="Logo" className="w-35 h-16 mx-auto mb-4" />
      <Form
        form={form}
        name="change-password-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        className="login-form"
      >
        <h2 className="font-extrabold text-2xl text-violet-400 text-center mb-4">Modifier le mot de passe</h2>
        <Form.Item
          name="currentPassword"
          rules={[
            {
              required: true,
              message: 'Veuillez entrer votre mot de passe actuel',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Mot de passe actuel" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Veuillez entrer le nouveau mot de passe',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Nouveau mot de passe" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Veuillez confirmer le nouveau mot de passe',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirmer le nouveau mot de passe" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button font-bold bg-violet-400 hover:bg-violet-300"
            loading={loading}
          >
            Modifier le mot de passe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewPassword;

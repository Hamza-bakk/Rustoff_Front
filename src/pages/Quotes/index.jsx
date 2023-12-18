import { Form, Input, Button, Select, message } from 'antd';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;
//import { API_URL } from '../../../stores/apiUrl';

const { Option } = Select;

const QuoteForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(API_URL + '/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote: values }),
      });

      if (response.status === 302) {
        // Redirection, suit la nouvelle URL
        const redirectUrl = response.headers.get('Location');
        window.location.href = redirectUrl;
      } else if (response.ok) {
        // La requête a réussi (200 OK), tu peux gérer la réponse ici
        const data = await response.json();
        console.log(data);
        form.resetFields();
        message.success('Devis créé avec succès.');
      } else {
        // La requête a échoué, gestion des erreurs ici
        const errorText = await response.text(); // Obtient le texte de l'erreur
        console.error('Erreur lors de la requête POST:', response.statusText, errorText);
        message.error(`Erreur lors de la création du devis: ${errorText}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      message.error('Erreur lors de la création du devis.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-extrabold text-center mb-4">Demande de Devis</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="first_name" label="Prénom" rules={[{ required: true, message: 'Veuillez entrer votre prénom' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="last_name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer votre nom' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="email" label="Adresse Email" rules={[{ required: true, type: 'email', message: 'Veuillez entrer une adresse email valide' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description de votre projet" rules={[{ required: true, message: 'Veuillez entrer la description de votre projet' }]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="category" label="Type de projet" rules={[{ required: true, message: 'Veuillez sélectionner le type de projet' }]}>
          <Select>
            <Option value="3D">3D</Option>
            <Option value="Animation">Animation</Option>
            <Option value="Logo">Logo</Option>
            <Option value="Twitch">Twitch</Option>
            <Option value="Merch">Merch</Option>
            <Option value="Tattoo">Tattoo</Option>
            <Option value="Design Divers">Design Divers</Option>
            <Option value="Avatars">Avatars</Option>
            <Option value="Autres">Autres</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
            Soumettre
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuoteForm;

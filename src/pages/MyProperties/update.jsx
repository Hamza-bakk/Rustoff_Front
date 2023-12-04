import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom';
import { API_URL } from '../../stores/apiUrl';

function UpdateProperty() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const propertyId = useParams().id;



  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProperty = {
      property: {
        title: title,
        price: price,
        description: description,
        user_id: user.id
      }
    };

    try {
      const response = await fetch(API_URL + '/properties/' + propertyId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newProperty),
      });

      if (response.ok) {
        console.log('Le bien a été  modifié avec succès');
        navigate(`/myproperties/${user.id}`)

      } else {
        console.error("Erreur lors de la modification du bien");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du bien :", error);
    }
  };

  return (
    <div>
      <h2>Modifier ce bien</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price :</label>
          <input
            type="number"
            id="content"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default UpdateProperty;

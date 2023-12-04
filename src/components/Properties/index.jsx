import { useState, useEffect } from "react";
import { API_URL } from "../../stores/apiUrl";
import { Link } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([])


 // RECUPERER LES DONNEES POUR LA LISTE
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "/properties", {
        method: 'get',
        headers: {
          // 'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonData = await response.json();
        const reversedData = jsonData.reverse();
        setProperties(reversedData);
      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error)
    }
  };
  fetchData()
}, []);



return (
  <div>
    <h3>Voici la liste des biens</h3>
      {properties.map(property => {
        return (
          <div key={property.id}>
            <p>annonce n° : {property.id}</p>
            <p>titre : {property.title} </p>
            <p>description : {property.description}</p>
            <p>prix : {property.price}</p>
            <Link to={`/property/${property.id}`}>en savoir plus</Link>
            <p>*******************</p>
          </div>
        )
      })}
  </div>
)
}

export default Properties

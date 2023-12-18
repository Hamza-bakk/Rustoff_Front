import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;
//import { API_URL } from '../../stores/apiUrl';

export default function OrdersAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/orders")
      .then(response => response.json())
      .then(data => {
        console.log("Orders data:", data); // Ajoutez cette ligne pour le débogage
        setData(data);
      })
      .catch(error => console.error(error));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'user_id', headerName: 'Id User', width: 350 },
    { field: 'total_price', headerName: 'Total Price', width: 150 },
  ];

  return (
    <div style={{ width: '50%', marginLeft: '25%', marginTop: '5%', background: '#fff' }}>
      <div style={{ height: 350, width: '100%' }}>
      <DataGrid rows={data || []} columns={columns} />
      </div>
    </div>
  );
}

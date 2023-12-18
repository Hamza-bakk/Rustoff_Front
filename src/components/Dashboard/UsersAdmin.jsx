import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

// const API_URL = `${import.meta.env.VITE_BASE_URL}`;
import { API_URL } from '../../stores/apiUrl';

export default function UsersAdmin() { // Ajoutez la déclaration du composant
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(API_URL + "/users")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error))
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'email', headerName: 'Email', width: 350 },
        { field: 'admin', headerName: 'Admin', width: 100 }
    ];

    return (
        <div style={{ width: '50%', marginLeft: '25%', marginTop: '5%', background: '#fff' }}>
            <div style={{ height: 350, width: '100%' }}>
                <DataGrid rows={data} columns={columns} />
            </div>
        </div>
    );
}

// Ajoutez l'exportation à la fin du fichier
export { UsersAdmin };

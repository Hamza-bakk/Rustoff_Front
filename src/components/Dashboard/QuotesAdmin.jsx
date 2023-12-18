import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;
//import { API_URL } from '../../stores/apiUrl';

const QuotesAdmin = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch(API_URL + "/quotes")
            .then(response => response.json())
            .then(data => setQuotes(data))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleQuoteStatusChange = (id, checked) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checked }),
        };

        fetch(`${API_URL}/quotes/${id}/mark`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setQuotes(prevQuotes => prevQuotes.map(quote => (quote.id === id ? data : quote)));
            })
            .catch(error => console.error(error));
    };

    const handleReprocessQuote = (id) => {
        handleQuoteStatusChange(id, false);
    };

    const handleDeleteQuote = (id) => {
      const requestOptions = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      };
  
      fetch(`${API_URL}/quotes/${id}/destroy`, requestOptions)
          .then(response => response.json())
          .then(() => {
              setQuotes(prevQuotes => prevQuotes.filter(quote => quote.id !== id));
          })
          .catch(error => console.error(error));
  };

        const unprocessedQuotes = quotes.filter(quote => !quote.processed);
    const processedQuotes = quotes.filter(quote => quote.processed);

    const commonColumns = [
        { field: 'first_name', headerName: 'Prénom', width: 150 },
        { field: 'last_name', headerName: 'Nom', width: 150 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'description', headerName: 'Description', width: 600 },
        { field: 'category', headerName: 'Catégorie', width: 150 },
        { field: 'processed', headerName: 'Devis traité', width: 100 },
    ];

    const actionColumn = {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
          <div>
              <button
                  style={{ backgroundColor: params.row.processed ? 'red' : 'green', color: 'white' }}
                  onClick={() => handleQuoteStatusChange(params.row.id, !params.row.processed)}
              >
                  {params.row.processed ? 'Dévalider' : 'Valider'}
              </button>
              {!params.row.processed && (
                  <button
                      style={{ backgroundColor: 'red', color: 'white' }}
                      onClick={() => handleReprocessQuote(params.row.id)}
                  >
                      
                  </button>
              )}
          </div>
      ),
  };

    const deleteColumn = {
        field: 'delete',
        headerName: 'Supprimer',
        width: 80,
        renderCell: (params) => (
            <button 
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => handleDeleteQuote(params.row.id)}>
                Supprimer
            </button>
        ),
    };

    const quoteColumnsWithDelete = [...commonColumns, actionColumn, deleteColumn];

    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
          {loading && <p>Loading...</p>}
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', textDecoration: 'underline', fontWeight: 'bold' }}>Devis Non traités :</h2>
          <div style={{ height: 350, width: '100%', background: '#fff' }}>
              <DataGrid rows={unprocessedQuotes} columns={quoteColumnsWithDelete} />
          </div>
          <h2 style={{ fontSize: '2rem', marginTop: '20px', marginBottom: '20px', textDecoration: 'underline', fontWeight: 'bold' }}>Devis traités :</h2>
          <div style={{ height: 350, width: '100%', background: '#fff' }}>
              <DataGrid rows={processedQuotes} columns={quoteColumnsWithDelete} />
          </div>
      </div>
  );
};

export default QuotesAdmin;
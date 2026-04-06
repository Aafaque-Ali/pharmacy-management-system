import { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ name: '', manufacturer: '', price: '', stock: '', category: '', description: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await API.get('/medicines/all');
      setMedicines(response.data);
    } catch (err) {
      console.error('Failed to fetch medicines');
    }
  };

  const handleSubmit = async () => {
    try {
        await API.post('/medicines/add', form);
        setMessage('Medicine added successfully!');
        setForm({ name: '', manufacturer: '', price: '', stock: '', category: '', description: '' });
        fetchMedicines();
        setTimeout(() => setMessage(''), 2000);
    } catch (err) {
        const errorData = err.response?.data;
        if (Array.isArray(errorData)) {
        setMessage(errorData.join(', '));
        } else {
        setMessage('Failed to add medicine');
        }
        setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/medicines/${id}`);
      fetchMedicines();
    } catch (err) {
      console.error('Failed to delete medicine');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Medicines</h2>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.form}>
          <h3>Add New Medicine</h3>
          <div style={styles.formGrid}>
            <input style={styles.input} placeholder="Medicine Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input style={styles.input} placeholder="Manufacturer" value={form.manufacturer}
              onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} />
            <input style={styles.input} placeholder="Price" type="number" value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input style={styles.input} placeholder="Stock" type="number" value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            <input style={styles.input} placeholder="Category" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input style={styles.input} placeholder="Description" value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button style={styles.button} onClick={handleSubmit}>Add Medicine</button>
        </div>

        <div style={styles.list}>
          <h3>All Medicines</h3>
          {medicines.length === 0 ? <p>No medicines found.</p> : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Manufacturer</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td style={styles.td}>{medicine.id}</td>
                    <td style={styles.td}>{medicine.name}</td>
                    <td style={styles.td}>{medicine.manufacturer}</td>
                    <td style={styles.td}>₹{medicine.price}</td>
                    <td style={styles.td}>{medicine.stock}</td>
                    <td style={styles.td}>{medicine.category}</td>
                    <td style={styles.td}>
                      <button style={styles.deleteBtn}
                        onClick={() => handleDelete(medicine.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '24px', maxWidth: '1200px', margin: '0 auto' },
  title: { color: '#1a73e8' },
  form: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '14px' },
  button: { padding: '10px 24px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' },
  list: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { backgroundColor: '#1a73e8', color: 'white', padding: '10px', textAlign: 'left' },
  td: { padding: '10px', borderBottom: '1px solid #eee' },
  deleteBtn: { padding: '6px 12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  message: { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px', marginBottom: '16px' },
};

export default Medicines;
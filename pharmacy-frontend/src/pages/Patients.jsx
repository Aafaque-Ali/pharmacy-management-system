import { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', gender: '', phone: '', address: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await API.get('/patients/all');
      setPatients(response.data);
    } catch (err) {
      console.error('Failed to fetch patients');
    }
  };

  const handleSubmit = async () => {
    try {
        await API.post('/patients/add', form);
        setMessage('Patient added successfully!');
        setForm({ name: '', age: '', gender: '', phone: '', address: '' });
        fetchPatients();
        setTimeout(() => setMessage(''), 2000);
    } catch (err) {
        const errorData = err.response?.data;
        if (Array.isArray(errorData)) {
        setMessage(errorData.join(', '));
        } else {
        setMessage('Failed to add patient');
        }
        setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error('Failed to delete patient');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Patients</h2>

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.form}>
          <h3>Add New Patient</h3>
          <div style={styles.formGrid}>
            <input style={styles.input} placeholder="Full Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input style={styles.input} placeholder="Age" type="number" value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })} />
            <select style={styles.input} value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input style={styles.input} placeholder="Phone" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input style={styles.input} placeholder="Address" value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <button style={styles.button} onClick={handleSubmit}>Add Patient</button>
        </div>

        <div style={styles.list}>
          <h3>All Patients</h3>
          {patients.length === 0 ? <p>No patients found.</p> : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Age</th>
                  <th style={styles.th}>Gender</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Address</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td style={styles.td}>{patient.id}</td>
                    <td style={styles.td}>{patient.name}</td>
                    <td style={styles.td}>{patient.age}</td>
                    <td style={styles.td}>{patient.gender}</td>
                    <td style={styles.td}>{patient.phone}</td>
                    <td style={styles.td}>{patient.address}</td>
                    <td style={styles.td}>
                      <button style={styles.deleteBtn}
                        onClick={() => handleDelete(patient.id)}>
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

export default Patients;
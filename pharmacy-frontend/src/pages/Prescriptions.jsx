import { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({ patientId: '', medicineId: '', quantity: '', doctorName: '', notes: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [pRes, mRes, prRes] = await Promise.all([
        API.get('/patients/all'),
        API.get('/medicines/all'),
        API.get('/prescriptions/all'),
      ]);
      setPatients(pRes.data);
      setMedicines(mRes.data);
      setPrescriptions(prRes.data);
    } catch (err) {
      console.error('Failed to fetch data');
    }
  };

  const handleSubmit = async () => {
    setError('');
    try {
      await API.post('/prescriptions/create', form);
      setMessage('Prescription created successfully!');
      setForm({ patientId: '', medicineId: '', quantity: '', doctorName: '', notes: '' });
      fetchAll();
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      const errorData = err.response?.data;
      if (Array.isArray(errorData)) {
        setError(errorData.join(', '));
      } else if (typeof errorData === 'string') {
        setError(errorData);
      } else {
        setError('Failed to create prescription');
      }
      setTimeout(() => setError(''), 3000);
    }
  };

  const getPatientName = (id) => {
    const patient = patients.find(p => p.id === id);
    return patient ? patient.name : id;
  };

  const getMedicineName = (id) => {
    const medicine = medicines.find(m => m.id === id);
    return medicine ? medicine.name : id;
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Prescriptions</h2>

        {message && <p style={styles.message}>{message}</p>}
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.form}>
          <h3>Create New Prescription</h3>
          <div style={styles.formGrid}>
            <select style={styles.input} value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
              <option value="">Select Patient</option>
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <select style={styles.input} value={form.medicineId}
              onChange={(e) => setForm({ ...form, medicineId: e.target.value })}>
              <option value="">Select Medicine</option>
              {medicines.map(m => (
                <option key={m.id} value={m.id}>{m.name} (Stock: {m.stock})</option>
              ))}
            </select>
            <input style={styles.input} placeholder="Quantity" type="number" value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <input style={styles.input} placeholder="Doctor Name" value={form.doctorName}
              onChange={(e) => setForm({ ...form, doctorName: e.target.value })} />
            <input style={styles.input} placeholder="Notes" value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <button style={styles.button} onClick={handleSubmit}>Create Prescription</button>
        </div>

        <div style={styles.list}>
          <h3>All Prescriptions</h3>
          {prescriptions.length === 0 ? <p>No prescriptions found.</p> : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Medicine</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Doctor</th>
                  <th style={styles.th}>Notes</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((p) => (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.id}</td>
                    <td style={styles.td}>{getPatientName(p.patientId)}</td>
                    <td style={styles.td}>{getMedicineName(p.medicineId)}</td>
                    <td style={styles.td}>{p.quantity}</td>
                    <td style={styles.td}>{p.doctorName}</td>
                    <td style={styles.td}>{p.notes}</td>
                    <td style={styles.td}>
                      <span style={{ color: p.status === 'ACTIVE' ? 'green' : 'gray' }}>
                        {p.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {new Date(p.prescriptionDate).toLocaleDateString('en-IN')}
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
  message: { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px', marginBottom: '16px' },
  error: { backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '16px' },
};

export default Prescriptions;
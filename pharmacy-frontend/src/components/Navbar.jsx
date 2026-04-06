import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo} onClick={() => navigate('/')}>
        💊 PharmaCare
      </h2>
      <div style={styles.navLinks}>
        <button style={styles.btn} onClick={() => navigate('/patients')}>
          Patients
        </button>
        <button style={styles.btn} onClick={() => navigate('/medicines')}>
          Medicines
        </button>
        <button style={styles.btn} onClick={() => navigate('/prescriptions')}>
          Prescriptions
        </button>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#1a73e8',
    color: 'white',
  },
  logo: {
    margin: 0,
    cursor: 'pointer',
    color: 'white',
  },
  navLinks: {
    display: 'flex',
    gap: '12px',
  },
  btn: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#1a73e8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

export default Navbar;
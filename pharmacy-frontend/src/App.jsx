import { Routes, Route, Navigate } from 'react-router-dom';
import Patients from './pages/Patients';
import Medicines from './pages/Medicines';
import Prescriptions from './pages/Prescriptions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/patients" />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
    </Routes>
  )
}

export default App
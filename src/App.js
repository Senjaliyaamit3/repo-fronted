import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import './App.css';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
      <Route path="/users/add" element={<AuthRoute><AddUser /></AuthRoute>} />
      <Route path="/users/edit/:id" element={<AuthRoute><EditUser /></AuthRoute>} />
    </Routes>
  );
}

export default App;

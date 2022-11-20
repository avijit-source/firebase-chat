import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import PublicRoutes from './PrivateRoutes/PublicRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route exact path="/register" element={<PublicRoutes restricted={true}><Register /></PublicRoutes>} />
          <Route exact path="/login" element={<PublicRoutes restricted={true}><Login /></PublicRoutes>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

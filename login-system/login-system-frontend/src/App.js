import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Handle login response
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">

        <div className="w-full max-w-md">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default App;
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { StateProvider } from './context/StateContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<SignIn />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              {/* Add other protected routes here */}
            </Route>
          </Routes>
        </Router>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import SignIn from './components/SignIn';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShortProfile from './components/ShortProfile';
import { AuthProvider } from './context/AuthContext';
import User from './components/User';
import Home from './pages/Home';
import { StateProvider } from './context/StateContext';


function App() {
  return (
    <AuthProvider>
      <StateProvider>
        <Router>
          <Routes>
            {/* <Route path = '/' element = {<ShortProfile userId={'66d720d4baf49d4a3904e2fd'}/>} /> */}
            <Route path = '/' element = {<Home />} />
            <Route path = '/signup' element={<Signup />} />
            <Route path = '/login' element={<SignIn />} />
          </Routes>
        </Router>
      </StateProvider>
    </AuthProvider>
  );
}

export default App;

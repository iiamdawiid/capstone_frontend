import Navbar from '../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Register from './Register';
import Login from './Login';
import { userContext } from '../userContext';
import React, { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <userContext.Provider value={value}>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </userContext.Provider>
    </div>
  )
}

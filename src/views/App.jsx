import Navbar from '../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Register from './Register';
import Login from './Login';
import { userContext } from '../userContext';
import React, { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import Home from './Home';
import BasalMetabolicRate from './BasalMetabolicRate';
import OneRepMax from './OneRepMax';
import FoodNutrition from './FoodNutrition';

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
          <Route path='/home' element={<Home />} />
          <Route path='/bmrcalculator' element={<BasalMetabolicRate />} />
          <Route path='/onerepmax' element={<OneRepMax />} />
          <Route path='/foodnutrition' element={<FoodNutrition />} />
        </Routes>
      </userContext.Provider>
    </div>
  )
}

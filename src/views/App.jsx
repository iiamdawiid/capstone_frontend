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
import EditProfile from './EditProfile';
import SavedCalories from './SavedCalories';
import SavedMaxes from './SavedMaxes';
import SavedFoodNutrition from './SavedFoodNutrition'

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
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/bmrcalculator' element={<BasalMetabolicRate />} />
          <Route path='/onerepmax' element={<OneRepMax />} />
          <Route path='/foodnutrition' element={<FoodNutrition />} />
          <Route path='/savedcalories' element={<SavedCalories />} />
          <Route path='/savedmaxes' element={<SavedMaxes />} />
          <Route path='/savedfoodnutrition' element={<SavedFoodNutrition />} />
        </Routes>
      </userContext.Provider>
    </div>
  )
}

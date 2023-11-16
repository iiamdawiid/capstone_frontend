import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SavedFoodNutrition() {
  const [savedNutrition, setSavedNutrition] = useState([]);
  const navigate = useNavigate();

  const BACKEND_API_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    handleGetSavedNutrition();
  }, []);

  const handleGetSavedNutrition = async () => {
    // call backend to receive all saved nutrition for user
    try {
      const response = await fetch(`${BACKEND_API_URL}/foodnutrition/saved_foods`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.saved_foods)
        setSavedNutrition(data.saved_foods)
      } else {
        toast.error('Server response error');
      }
    } catch (error) {
      toast.error('Error fetching saved nutrition: ', error);
    }
  }

  const handleDelete = async (nutrition) => {
    // call backend to delete nutrition
    try {
      const response = await fetch(`${BACKEND_API_URL}/foodnutrition/delete_foods/${nutrition.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setSavedNutrition((prevNutrition) => prevNutrition.filter((n) => n.id !== nutrition.id));
        toast.success('Saved nutrition deleted successfully');
      } else {
        toast.error('Failed to delete saved nutrition')
      }
    } catch (error) {
      toast.error('Error deleting saved nutrition');
    }
  }

  return (
    <div className="centered-container-savednutrition">
      <h1 className="mb-5">Saved Nutrition</h1>
      {savedNutrition.length > 0 ? (
        <div className="saved-nutrition-grid">
          {savedNutrition.map((nutrition) => (
            <div key={nutrition.id} className="saved-nutrition-entry">
              <li className="text-green-400">Food: {nutrition.food_name}</li>
              <li className="text-green-400">Calories: {nutrition.calories}</li>
              <li className="text-green-400">Serving Size: {nutrition.serving_size}g</li>
              <hr />
              <li className="text-red-500">Protein: {nutrition.protein}g</li>
              <li className="text-yellow-400">Fats: {nutrition.fats}g</li>
              <li className="text-blue-300">Carbs: {nutrition.carb}g</li>
              <div className="mt-3">
                <button className="btn btn-error btn-xs del-cal-btn" onClick={() => document.getElementById(`my_modal_2${nutrition.id}`).showModal()}>DELETE</button>
                <dialog id={`my_modal_2${nutrition.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">DELETE SAVED FOOD NUTRITION</h3>
                    <p className="py-4">Are you sure you want to delete?</p>
                    <button onClick={() => handleDelete(nutrition)} className="btn btn-error btn-xs del-cal-btn">DELETE</button>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2 className="text-center text-white text-4xl mt-48 font-bold">!! No Saved Food Nutrition !!</h2>
          <h3 className="text-center text-2xl mt-5">Click below to go save some!</h3>
          <div className="flex justify-center mt-5">
            <button onClick={() => navigate('/foodnutrition')} className="btn btn-wide btn-success rounded inline-block drop-shadow-lg glow-btn"><strong>NUTRITION LOOK-UP</strong></button>
          </div>
        </>
      )}
    </div>
  )
}
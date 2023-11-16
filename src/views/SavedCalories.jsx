import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SavedCalories() {
  const [savedCalories, setSavedCalories] = useState([]);
  const navigate = useNavigate();

  const BACKEND_API_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    handleGetSavedCalories();
  }, []);

  const handleGetSavedCalories = async () => {
    // call backend to receive all saved calories for user
    try {
      const response = await fetch(`${BACKEND_API_URL}/bmrcalculator/saved_calories`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.saved_calories)
        setSavedCalories(data.saved_calories)
      } else {
        toast.error('Server response error');
      }
    } catch (error) {
      toast.error('Error fetching saved calories');
    }
  }

  const handleDelete = async (calorie) => {
    // call backend to delete calories
    try {
      const response = await fetch(`${BACKEND_API_URL}/bmrcalculator/delete_calories/${calorie.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setSavedCalories((prevCalories) => prevCalories.filter((cal) => cal.id !== calorie.id));
        toast.success('Saved calories deleted successfully');
      } else {
        toast.error('Failed to delete saved calories')
      }
    } catch (error) {
      toast.error('Error deleting saved calories: ', error);
    }
  }

  return (
    <>
      <div className="flex justify-center mt-3">
        <button className="btn btn-warning glow-btn" onClick={() => document.getElementById('my_modal_3').showModal()}>READ FIRST</button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center text-yellow-400">SAVED CALORIES KEY</h3>
            <div className="text-center">
              <h4 className="mt-5">METRIC UNITS</h4>
              <p className="mt-1 text-green-400">G1: + 0.25 kg / week</p>
              <p className="text-green-400">G2: + 0.50 kg / week</p>
              <p className="text-green-400">G3: + 1.00 kg / week</p>
              <p className="mt-5 text-red-500">L1: - 0.25 kg / week</p>
              <p className="text-red-500">L2: - 0.50 kg / week</p>
              <p className="text-red-500">L3: - 1.00 kg / week</p>
              <h4 className="mt-5">IMPERIAL UNITS</h4>
              <p className="mt-1 text-green-400">G1: + 0.50 lbs / week</p>
              <p className="text-green-400">G2: + 1.00 lbs / week</p>
              <p className="text-green-400">G3: + 2.00 lbs / week</p>
              <p className="mt-5 text-red-500">L1: - 0.50 lbs / week</p>
              <p className="text-red-500">L2: - 1.00 lbs / week</p>
              <p className="text-red-500">L3: - 2.00 lbs / week</p>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="centered-container-savedcalories">
        <h1 className="mb-5">Saved Calories</h1>
        {savedCalories.length > 0 ? (
          <div className="saved-calories-grid">
            {savedCalories.map((calorie) => (
              <div key={calorie.id} className="saved-calories-entry">
                <li className="text-yellow-400">Calories: {calorie.calories}</li>
                <li>Units: {calorie.units}</li>
                <li>Gender: {calorie.gender}</li>
                <li>Weight: {calorie.weight}</li>
                <li>Height: {calorie.height}</li>

                <div className="weight-columns">
                  <div className="gain-weight-column">
                    <li className="text-green-400">GAIN WEIGHT</li>
                    <li>G1: {calorie.gain_weight1}</li>
                    <li>G2: {calorie.gain_weight2}</li>
                    <li className="text-green-500">G3: {calorie.gain_weight3}</li>
                  </div>

                  <div className="lose-weight-column">
                    <li className="text-red-500">LOSE WEIGHT</li>
                    <li>L1: {calorie.lose_weight1}</li>
                    <li>L2: {calorie.lose_weight2}</li>
                    <li className="text-red-600">L3: {calorie.lose_weight3}</li>
                  </div>
                </div>
                <div>
                  <button className="btn btn-error btn-xs del-cal-btn" onClick={() => document.getElementById(`my_modal_2${calorie.id}`).showModal()}>DELETE</button>
                  <dialog id={`my_modal_2${calorie.id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">DELETE SAVED CALORIES</h3>
                      <p className="py-4">Are you sure you want to delete?</p>
                      <button onClick={() => handleDelete(calorie)} className="btn btn-error btn-xs del-cal-btn">DELETE</button>
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
            <h2 className="text-center text-white text-4xl mt-48 font-bold">!! No Saved Calories !!</h2>
            <h3 className="text-center text-2xl mt-5">Click below to go save some!</h3>
            <div className="flex justify-center mt-5">
              <button onClick={() => navigate('/bmrcalculator')} className="btn btn-wide btn-success rounded inline-block drop-shadow-lg glow-btn"><strong>CALORIE CALCULATOR</strong></button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

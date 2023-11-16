import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SavedMaxes() {
  const [savedMaxes, setSavedMaxes] = useState([]);
  const navigate = useNavigate();

  const BACKEND_API_URL = import.meta.env.VITE_API_BACKEND_URL;

  useEffect(() => {
    handleGetSavedMaxes();
  }, []);

  const handleGetSavedMaxes = async () => {
    // call backend to receive all saved maxes for user
    try {
      const response = await fetch(`${BACKEND_API_URL}/onerepmax/saved_maxes`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.saved_maxes)
        setSavedMaxes(data.saved_maxes)
      } else {
        toast.error('Server response error');
      }
    } catch (error) {
      toast.error('Error fetching saved maxes');
    }
  }

  const handleDelete = async (max) => {
    // call backend to delete maxes
    try {
      const response = await fetch(`${BACKEND_API_URL}/onerepmax/delete_onerepmax/${max.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setSavedMaxes((prevMaxes) => prevMaxes.filter((m) => m.id !== max.id));
        toast.success('Saved max deleted successfully');
      } else {
        toast.error('Failed to delete saved max')
      }
    } catch (error) {
      toast.error('Error deleting saved max: ', error);
    }
  }

  return (
    <div className="centered-container-savedmaxes">
      <h1 className="mb-5">Saved Maxes</h1>
      {savedMaxes.length > 0 ? (
        <div className="saved-maxes-grid">
          {savedMaxes.map((max) => (
            <div key={max.id} className="saved-maxes-entry">
              <li className="text-green-400">One Rep Max: {max.one_rep_max}</li>
              <li className="text-yellow-400">Weight: {max.weight} x {max.reps} reps</li>
              <li>Units: {max.units}</li>

              <div className="weight-columns">
                <div className="gain-weight-column">
                  <li style={{textDecoration: 'underline'}}>% of MAX</li>
                  <li className="text-red-700">95% : {max.percentage1}</li>
                  <li className="text-red-600">90% : {max.percentage2}</li>
                  <li className="text-red-500">85% : {max.percentage3}</li>
                  <li className="text-red-400">80% : {max.percentage4}</li>
                </div>

                <div className="lose-weight-column">
                  <li style={{textDecoration: 'underline'}}>% of MAX</li>
                  <li className="text-orange-400">75% : {max.percentage5}</li>
                  <li className="text-orange-500">70% : {max.percentage6}</li>
                  <li className="text-orange-600">65% : {max.percentage7}</li>
                  <li className="text-orange-700">60% : {max.percentage8}</li>
                </div>
              </div>
              <div>
                <button className="btn btn-error btn-xs del-cal-btn" onClick={() => document.getElementById(`my_modal_2${max.id}`).showModal()}>DELETE</button>
                <dialog id={`my_modal_2${max.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">DELETE SAVED MAX</h3>
                    <p className="py-4">Are you sure you want to delete?</p>
                    <button onClick={() => handleDelete(max)} className="btn btn-error btn-xs del-cal-btn">DELETE</button>
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
          <h2 className="text-center text-white text-4xl mt-48 font-bold">!! No Saved Maxes !!</h2>
          <h3 className="text-center text-2xl mt-5">Click below to go save some!</h3>
          <div className="flex justify-center mt-5">
            <button onClick={() => navigate('/onerepmax')} className="btn btn-wide btn-success rounded inline-block drop-shadow-lg glow-btn"><strong>ONE REP MAX CALCULATOR</strong></button>
          </div>
        </>
      )}
    </div>
  )
}
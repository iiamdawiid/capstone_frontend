import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OneRepMax() {
  const [liftType, setLiftType] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [toggleSwitch, setToggleSwitch] = useState("");
  const [oneRepMax, setOneRepMax] = useState(0);
  const [units, setUnits] = useState("");
  const [isMaxSaved, setIsMaxSaved] = useState(false);

  const API_URL = import.meta.env.VITE_API_BACKEND_URL;

  const toggle = () => {
    setToggleSwitch((prevToggle) => {
      const newToggle = prevToggle === "ON" ? "" : "ON";
      setUnits(newToggle === "ON" ? "IMPERIAL" : "METRIC");
      return newToggle;
    });
  };

  const oneRepMaxForm = (e) => {
    e.preventDefault();
    setIsMaxSaved(false);
    if (liftType, weight, reps) {
      handleCalculation();
    } else {
      toast.error("All form fields must be filled")
    }
  }

  const handleCalculation = () => {
    setOneRepMax(() => weight / (1.0278 - 0.0278 * reps))
  }

  const handleSaveMax = async (e) => {
    e.preventDefault();
    setIsMaxSaved(true);

    const response = await fetch(`${API_URL}/onerepmax/save_onerepmax`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "type_of_lift": liftType,
        "weight": weight,
        "reps": reps,
        "units": toggleSwitch === "ON" ? "IMPERIAL" : "METRIC",
        "one_rep_max": parseInt(oneRepMax),
        "percentage1": parseInt(oneRepMax * 0.95),
        "percentage2": parseInt(oneRepMax * 0.90),
        "percentage3": parseInt(oneRepMax * 0.85),
        "percentage4": parseInt(oneRepMax * 0.80),
        "percentage5": parseInt(oneRepMax * 0.75),
        "percentage6": parseInt(oneRepMax * 0.70),
        "percentage7": parseInt(oneRepMax * 0.65),
        "percentage8": parseInt(oneRepMax * 0.60)
      })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data); // temp
      toast.success('Results have been saved');
    } else {
      toast.error('Error saving results');
    }
  };

  const saveButton = () => {
    if (isMaxSaved) {
      return null;
    } else {
      return (
        <div className="flex justify-center items-center">
          <button onClick={handleSaveMax} className="btn btn-success rounded inline-block mt-2 mb-2 ml-8 drop-shadow-lg glow-btn"><strong>SAVE</strong></button>
        </div>
      )
    }
  }

  return (
    <>
      <div className="centered-container-1rm rounded">
        <h1 className="text-center text-4xl font-bold text-white" style={{ backgroundColor: 'black', color: 'white', padding: '20px 0', margin: '0', textAlign: 'center' }}>One Rep Max Calculator</h1>
        <div style={{ backgroundColor: 'grey', padding: '20px 0', margin: '0', height: '27%' }}>
          <div className="ml-6 mr-6">
            <h2 className="text-2xl text-black font-bold">One Rep Max</h2>
            <p className="mt-3 text-white">
              A higher amount of completed reps will result in a more inaccurate estimate. Do not enter more than 10 reps.
              To maximize accuracy, pick a weight that is sufficiently heavy but not too light. Completing a heavier weight for
              3 reps will be more accurate than completing a lighter weight for 8 reps. If your result is negative or lower than the input weight,
              it means that the combination of weight and number of reps is not compatible and usually means the reps are too high for that weight.
            </p>
          </div>
        </div>
        <form className="flex flex-col items-center mt-5">
          {/* <h1 className="text-xl">Type Of Lift</h1> */}
          <label className="text-xl text-white" htmlFor="lift">Type of Lift</label>
          <select id="lift" className="select select-info w-full max-w-xs mt-1" value={liftType} onChange={(e) => setLiftType(e.target.value)}>
            <option>Select lift</option>
            <option value="bench">Bench Press</option>
            <option value="squat">Squat</option>
            <option value="deadlift">Deadlift</option>
            <option value="other">Other</option>
          </select>
          {toggleSwitch ? (
            <>
              <label htmlFor="weight" className="mt-5 text-xl text-white">Weight (lbs)</label>
              <input onChange={(e) => setWeight(e.target.value)} type="text" id="weight" name="weight" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter weight" />
            </>
          ) : (
            <>
              <label htmlFor="weight" className="mt-5 text-xl text-white">Weight (kg)</label>
              <input onChange={(e) => setWeight(e.target.value)} type="text" id="weight" name="weight" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter weight" />
            </>
          )}
          <label htmlFor="reps" className="mt-5 text-xl text-white">Completed Repetitions</label>
          <input onChange={(e) => setReps(e.target.value)} type="text" id="reps" name="reps" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter # of reps" />
          <div className="form-control w-52 mt-3">
            <label className="cursor-pointer label">
              <span className="label-text mr-2" style={{ color: 'white' }}>METRIC</span>
              <input onClick={toggle} type="checkbox" className="toggle toggle-info" />
              <span className="label-text ml-2" style={{ color: 'white' }}>IMPERIAL</span>
            </label>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={oneRepMaxForm} className="btn btn-wide btn-circle btn-info rounded inline-block mt-6 mb-5 drop-shadow-lg glow-btn"><strong>Calculate</strong></button>
          </div>
        </form>
      </div>
      {oneRepMax !== null && oneRepMax > 0 && (
        <div className="centered-container-1rm rounded">
          <h1 className="text-center text-4xl font-bold text-white" style={{ backgroundColor: 'black', color: 'white', padding: '20px 0', margin: '0', textAlign: 'center' }}>One Rep Max Calculator</h1>
          {toggleSwitch ? (
            <>
              <div className="text-center mt-5">
                <h2 className="text-white font-bold text-3xl" style={{ textDecoration: 'underline' }}>ESTIMATED MAX</h2>
                <p className="mt-5 text-3xl font-bold text-green-400">{parseInt(oneRepMax)} lbs</p>
              </div>
              <div className="overflow-x-auto mt-6 w-9/12 flex m-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>% of 1RM</th>
                      <th>Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>100%</td>
                      <td>{parseInt(oneRepMax)}</td>
                    </tr>
                    <tr>
                      <td>95%</td>
                      <td>{parseInt(oneRepMax * 0.95)}</td>
                    </tr>
                    <tr>
                      <td>90%</td>
                      <td>{parseInt(oneRepMax * 0.90)}</td>
                    </tr>
                    <tr>
                      <td>85%</td>
                      <td>{parseInt(oneRepMax * 0.85)}</td>
                    </tr>
                    <tr>
                      <td>80%</td>
                      <td>{parseInt(oneRepMax * 0.80)}</td>
                    </tr>
                    <tr>
                      <td>75%</td>
                      <td>{parseInt(oneRepMax * 0.75)}</td>
                    </tr>
                    <tr>
                      <td>70%</td>
                      <td>{parseInt(oneRepMax * 0.70)}</td>
                    </tr>
                    <tr>
                      <td>65%</td>
                      <td>{parseInt(oneRepMax * 0.65)}</td>
                    </tr>
                    <tr>
                      <td>60%</td>
                      <td>{parseInt(oneRepMax * 0.60)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mt-5">
                <h2 className="text-white font-bold text-3xl" style={{ textDecoration: 'underline' }}>ESTIMATED MAX</h2>
                <p className="mt-5 text-3xl font-bold text-green-400">{parseInt(oneRepMax)} kg</p>
              </div>
              <div className="overflow-x-auto mt-6 w-9/12 flex m-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>% of 1RM</th>
                      <th>Weight (lbs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>100%</td>
                      <td>{parseInt(oneRepMax)}</td>
                    </tr>
                    <tr>
                      <td>95%</td>
                      <td>{parseInt(oneRepMax * 0.95)}</td>
                    </tr>
                    <tr>
                      <td>90%</td>
                      <td>{parseInt(oneRepMax * 0.90)}</td>
                    </tr>
                    <tr>
                      <td>85%</td>
                      <td>{parseInt(oneRepMax * 0.85)}</td>
                    </tr>
                    <tr>
                      <td>80%</td>
                      <td>{parseInt(oneRepMax * 0.80)}</td>
                    </tr>
                    <tr>
                      <td>75%</td>
                      <td>{parseInt(oneRepMax * 0.75)}</td>
                    </tr>
                    <tr>
                      <td>70%</td>
                      <td>{parseInt(oneRepMax * 0.70)}</td>
                    </tr>
                    <tr>
                      <td>65%</td>
                      <td>{parseInt(oneRepMax * 0.65)}</td>
                    </tr>
                    <tr>
                      <td>60%</td>
                      <td>{parseInt(oneRepMax * 0.60)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="flex justify-center items-center">
            <button onClick={() => setOneRepMax(0)} className="btn btn-warning rounded inline-block mt-3 mb-5 mr-10 drop-shadow-lg glow-btn"><strong>BACK</strong></button>
            {saveButton()}
          </div>
        </div>
      )}
    </>
  )
}

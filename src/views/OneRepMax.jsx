import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function OneRepMax() {
  const [liftType, setLiftType] = useState("");
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [toggleSwitch, setToggleSwitch] = useState("");
  const [oneRepMax, setOneRepMax] = useState(0);

  const toggle = () => {
    setToggleSwitch(prevToggle => prevToggle === "ON" ? "" : "ON");
  }


  // create ability to save 1rm calculation


  const oneRepMaxForm = (e) => {
    e.preventDefault();
    if (liftType, weight, reps) {
      if (toggleSwitch) {
        handleImperialCalculation();
      } else {
        handleMetricCalculation();
      }
    } else {
      toast.error("All form fields must be filled")
    }
  }

  const handleImperialCalculation = () => {
    setOneRepMax(() => (weight / 2.20462) / (1.0278 - 0.0278 * reps));
  }

  const handleMetricCalculation = () => {
    setOneRepMax(() => weight / (1.0278 - 0.0278 * reps))
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
              3 reps will be more accurate than completing a lighter weight for 8 reps. If your result is negative, it means that
              the combination of weight and number of reps is not compatible and usually means the reps are too high for that weight.
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
      {oneRepMax && (
        <div className="centered-container-1rm rounded">
          <h1 className="text-center text-4xl font-bold text-white" style={{ backgroundColor: 'black', color: 'white', padding: '20px 0', margin: '0', textAlign: 'center' }}>One Rep Max Calculator</h1>
          <div className="text-center mt-5">
            <h2 className="text-white font-bold text-3xl" style={{ textDecoration: 'underline' }}>ESTIMATED MAX</h2>
            <p className="mt-5 text-3xl font-bold text-green-400">{parseInt(oneRepMax)} kg</p>
          </div>
          <div className="overflow-x-auto mt-6 w-9/12 flex m-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>% of 1RM</th>
                  <th>Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>100%</td>
                  <td>Quality Control Specialist</td>
                </tr>
                <tr>
                  <td>95%</td>
                  <td>Desktop Support Technician</td>
                </tr>
                <tr>
                  <td>90%</td>
                  <td>Tax Accountant</td>
                </tr>
                <tr>
                  <td>85%</td>
                  <td>Tax Accountant</td>
                </tr>
                <tr>
                  <td>80%</td>
                  <td>Tax Accountant</td>
                </tr>
                <tr>
                  <td>75%</td>
                  <td>Tax Accountant</td>
                </tr>
                <tr>
                  <td>70%</td>
                  <td>Tax Accountant</td>
                </tr>
                <tr>
                  <td>65%</td>
                  <td>Tax Accountant</td>
                </tr>
                <tr>
                  <td>60%</td>
                  <td>Tax Accountant</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center">
            <button className="btn btn-wide btn-circle btn-info rounded inline-block mt-3 mb-5 drop-shadow-lg glow-btn"><strong>Calculate</strong></button>
          </div>
        </div>
      )}
    </>
  )
}

import React, { useState } from 'react';
import toast from 'react-hot-toast';


export default function BasalMetabolicRate() {
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("")
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [units, setUnits] = useState("");
  const [bmr, setBMR] = useState(0); // for when user decides to save bmr calculation
  const [toggleSwitch, setToggleSwitch] = useState("");
  const [isCaloriesSaved, setIsCaloriesSaved] = useState(false);

  const API_URL = import.meta.env.VITE_API_BACKEND_URL;

  const toggle = () => {
    setToggleSwitch((prevToggle) => {
      const newToggle = prevToggle === "ON" ? "" : "ON";
      setUnits(newToggle === "ON" ? "IMPERIAL" : "METRIC");
      return newToggle;
    });
  };

  const bmrForm = (e) => {
    e.preventDefault();
    setIsCaloriesSaved(false);
    if (gender && activityLevel && weight && height && age) {
      if (gender === "male") {
        if (toggleSwitch) {
          handleImperialBMR("male");
        } else {
          handleMetricBMR("female");
        }
      } else {
        if (toggleSwitch) {
          handleImperialBMR("female")
        } else {
          handleMetricBMR("female");
        }
      }
    } else {
      toast.error("All form fields must be filled");
    }
  }

  const handleMetricBMR = (sex) => {
    if (sex === "male") {
      const result = ((10 * weight) + (6.25 * height) - (5 * age) + 5) * parseFloat(activityLevel);
      setBMR(parseInt(result));
    } else {
      const result = ((10 * weight) + (6.25 * height) - (5 * age) - 161) * parseFloat(activityLevel);
      setBMR(parseInt(result));
    }
  }

  const handleImperialBMR = (sex) => {
    const weightInKg = weight / 2.20462;
    const heightInCm = height * 2.54;
    if (sex === "male") {
      const result = ((10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5) * parseFloat(activityLevel);
      setBMR(parseInt(result));
    } else {
      const result = ((10 * weightInKg) + (6.25 * heightInCm) - (5 * age) - 161) * parseFloat(activityLevel);
      setBMR(parseInt(result));
    }
  }

  const handleSaveBMR = async (e) => {
    e.preventDefault();
    setIsCaloriesSaved(true);

    const response = await fetch(`${API_URL}/bmrcalculator/save_calories`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "gender": gender,
        "activity_level": activityLevel,
        "weight": weight,
        "height": height,
        "age": age,
        "units": toggleSwitch === "ON" ? "IMPERIAL" : "METRIC",
        "calories": bmr,
        "gain_weight1": bmr + 275,
        "gain_weight2": bmr + 550,
        "gain_weight3": bmr + 1100,
        "lose_weight1": bmr - 275,
        "lose_weight2": bmr - 550,
        "lose_weight3": bmr - 1100
      }),
    });
    if (response.ok) {
      const data = await response.json();
      toast.success('Results have been saved');
    } else {
      toast.error('Error saving results');
    }
  };

  const saveButton = () => {
    if (isCaloriesSaved) {
      return null;
    } else {
      return (
        <div className="flex justify-center items-center">
          <button onClick={handleSaveBMR} className="btn btn-success rounded inline-block mt-2 mb-2 ml-8 drop-shadow-lg glow-btn"><strong>SAVE</strong></button>
        </div>
      )
    }
  }

  return (
    <>
      <div className="centered-container rounded">
        <h1 className="text-center text-4xl font-bold text-white" style={{ textShadow: '4px 4px #000000', backgroundColor: 'black', width: '100%', padding: '20px 0' }}>Basal Metabolic Rate (BMR) Calculator</h1>
        <div className="flex">
          <div className="bmr-form w-1/2 pr-4 mt-5 ml-5 rounded">
            <form>
              <div className="flex flex-col items-center mt-4">
                <h1 className="block text-xl text-white">Gender</h1>
                <select className="select select-info w-full max-w-xs mt-1" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <h1 className="block text-xl mt-5 text-white">Activity Level</h1>
                <select className="select select-info w-full max-w-xs mt-1" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                  <option selected>Select Activity Level</option>
                  <option value="1.00">Basal Metabolic Rate (BMR)</option>
                  <option value="1.20">Sedentary</option>
                  <option value="1.375">Light</option>
                  <option value="1.55">Moderate</option>
                  <option value="1.725">Active</option>
                  <option value="1.9">Very Active</option>
                </select>
              </div>
              <div className="flex flex-col items-center text-white">
                {toggleSwitch ? (
                  <>
                    <label htmlFor="weight" className="mt-5 text-xl">Weight (lbs)</label>
                    <input onChange={(e) => setWeight(e.target.value)} type="text" id="weight" name="weight" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter weight" />
                    <label htmlFor="height" className="mt-5 text-xl">Height (inches)</label>
                    <input onChange={(e) => setHeight(e.target.value)} type="text" id="height" name="height" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter height" />
                  </>
                ) : (
                  <>
                    <label htmlFor="weight" className="mt-5 text-xl">Weight (kg)</label>
                    <input onChange={(e) => setWeight(e.target.value)} type="text" id="weight" name="weight" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter weight" />
                    <label htmlFor="height" className="mt-5 text-xl">Height (cm)</label>
                    <input onChange={(e) => setHeight(e.target.value)} type="text" id="height" name="height" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter height" />
                  </>
                )}
                <label htmlFor="age" className="mt-5 text-xl">Age</label>
                <input onChange={(e) => setAge(e.target.value)} type="text" id="age" name="age" className="input input-bordered input-info w-full max-w-xs mt-1" placeholder="Enter age" />
              </div>
              <div className="flex justify-center items-center">
                <div className="form-control mt-3">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2" style={{ color: 'white' }}>METRIC</span>
                    <input onClick={toggle} type="checkbox" className="toggle toggle-info" />
                    <span className="label-text ml-2" style={{ color: 'white' }}>IMPERIAL</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button onClick={bmrForm} className="btn btn-wide btn-circle btn-info rounded inline-block mt-3 mb-5 drop-shadow-lg glow-btn"><strong>Calculate</strong></button>
              </div>
            </form>
          </div>
          <div className="w-1/2 pl-4 flex flex-col items-center mt-4">
            <p className="text-3xl text-white font-bold" style={{ textDecoration: 'underline', textShadow: '4px 4px #000000' }}>RESULTS</p>
            {bmr ? (
              <>
                <h1 className="mt-5 text-green-400 text-2xl font-bold">Maintenance Calories</h1>
                <p className="text-white text-xl">{bmr}</p>
                <h1 className="mt-10 text-green-600 text-2xl font-bold">Gain Weight</h1>
                {toggleSwitch ? (
                  <>
                    <div className="overflow-x-auto w-11/12 mr-10">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Rate</th>
                            <th>Calories</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td>+ 0.50 lb/week</td>
                            <td>{parseInt(bmr + 250)}</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <td>+ 1.00 lb/week</td>
                            <td>{parseInt(bmr + 500)}</td>
                          </tr>
                          {/* row 3 */}
                          <tr>
                            <td>+ 2.00 lb/week</td>
                            <td>{parseInt(bmr + 1000)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="overflow-x-auto w-11/12 flex mr-10">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Rate</th>
                            <th>Calories</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td>+ 0.25 kg/week</td>
                            <td>{parseInt(bmr + 275)}</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <td>+ 0.50 kg/week</td>
                            <td>{parseInt(bmr + 550)}</td>
                          </tr>
                          {/* row 3 */}
                          <tr>
                            <td>+ 1.00 kg/week</td>
                            <td>{parseInt(bmr + 1100)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
                <h1 className="mt02 text-red-400 text-2xl font-bold">Lose Weight</h1>
                {toggleSwitch ? (
                  <>
                    <div className="overflow-x-auto w-11/12 mr-10">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Rate</th>
                            <th>Calories</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td>- 0.50 lb/week</td>
                            <td>{parseInt(bmr - 250)}</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <td>- 1.00 lb/week</td>
                            <td>{parseInt(bmr - 500)}</td>
                          </tr>
                          {/* row 3 */}
                          <tr>
                            <td>- 2.00 lb/week</td>
                            <td>{parseInt(bmr - 1000)}</td>
                          </tr>
                        </tbody>
                      </table>
                      {saveButton()}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="overflow-x-auto w-11/12 mr-10">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Rate</th>
                            <th>Calories</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* row 1 */}
                          <tr>
                            <td>- 0.25 kg/week</td>
                            <td>{parseInt(bmr - 275)}</td>
                          </tr>
                          {/* row 2 */}
                          <tr>
                            <td>- 0.50 kg/week</td>
                            <td>{parseInt(bmr - 550)}</td>
                          </tr>
                          {/* row 3 */}
                          <tr>
                            <td>- 1.00 kg/week</td>
                            <td>{parseInt(bmr - 1100)}</td>
                          </tr>
                        </tbody>
                      </table>
                      {saveButton()}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h1 className="mt-56 text-white text-xl">No results to show.</h1>
                <h1 className="mt-5 text-white text-xl">To see your calories, complete the form.</h1>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="flex justify-center mt-2">
        <button className="btn btn-warning glow-btn" onClick={() => document.getElementById('my_modal_2').showModal()}>DISCLAIMER</button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">BMR Calculator</h3>
            <p className="py-4">
              The calculator is not 100% accurate. It's purpose is to serve as an estimate to give you an idea of a range of calories you would need
              to eat at. You can eat the calories it tells you but you will most likely need to adjust accordingly if you are gaining/losing more or less than
              you would like.
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  )
}
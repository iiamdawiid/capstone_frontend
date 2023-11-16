import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function FoodNutrition() {
    const [foodData, setFoodData] = useState([]);
    const [foodName, setFoodName] = useState("");
    const [calories, setCalories] = useState(0);
    const [servingSize, setServingSize] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [isFoodSaved, setIsFoodSaved] = useState(false);

    const BACKEND_API_URL = import.meta.env.VITE_API_BACKEND_URL;

    const fetchData = async () => {
        setIsFoodSaved(false);
        const apiKey = '6ntVu135EYe8nhMazZrOew==Vl1uaFbkk5TQF8xP';
        const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${foodName}`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setFoodData(data);
            console.log(foodData)
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [foodName]);

    useEffect(() => {
        if (foodData.length > 0) {
            const foodItem = foodData[0];
            setServingSize(foodItem.serving_size_g);
            setCalories(foodItem.calories);
            setProtein(foodItem.protein_g);
            setFat(foodItem.fat_total_g);
            setCarbs(foodItem.carbohydrates_total_g);
        }
    }, [foodData]);

    const handleSaveFood = async (e) => {
        e.preventDefault();
        setIsFoodSaved(true);

        // backend request
        const response = await fetch(`${BACKEND_API_URL}/foodnutrition/save_food_nutrition`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "food_name": foodName,
                "serving_size": servingSize,
                "calories": calories,
                "protein": protein,
                "fats": fat,
                "carbs": carbs
            })
        });
        if (response.ok) {
            const data = await response.json();
            toast.success(`Nutrition for ${foodName} has been saved`)
        } else {
            toast.error('Error saving results');
        }
    }

    const saveButton = () => {
        if (isFoodSaved) {
            return null;
        } else {
            return (
                <div className="text-center mt-3">
                    <button onClick={handleSaveFood} className="btn btn-success rounded inline-block drop-shadow-lg glow-btn"><strong>SAVE</strong></button>
                </div>
            )
        }
    }

    return (
        <div className="food-nutrition-container mt-14 flex" style={{ backgroundColor: 'grey' }}>
            <div className="form-container-search" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 className="text-center mb-8">Food Nutrition</h1>
                <form className="food-data-form">
                    <div className="label-input-fn">
                        <label htmlFor="search" className="block">Food Item</label>
                        <input
                            className="search-box input input-bordered input-primary mr-10"
                            onChange={(e) => setFoodName(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            id="search"
                            name="search"
                            value={foodName}
                        />
                        <p className="mt-10">To find the nutrition facts about a certain food, simply just type inside the text box.</p>
                    </div>
                </form>
            </div>
            <div className="food-data-container" style={{ flex: 1, padding: '20px' }}>
                <h1 className="text-center">Food Data</h1>
                {foodData.length > 0 ? (
                    <>
                        <div className="food-data-card text-center">
                            <ul>
                                {foodData.map((foodItem) => (
                                    <li key={foodItem.id}>
                                        <h2 className="mt-5 text-white">Food Name</h2>
                                        <p className="mb-3">{foodItem.name}, {foodItem.serving_size_g}g</p>
                                        <hr />
                                        <h2 className="mt-5 text-green-400">Calories</h2>
                                        <p className="mb-3">{foodItem.calories}</p>
                                        <hr />
                                        <h2 className="mt-5 text-red-400">Protein (g)</h2>
                                        <p className="mb-3">{foodItem.protein_g}</p>
                                        <hr />
                                        <h2 className="mt-5 text-yellow-400">Fats (g)</h2>
                                        <p className="mb-3">{foodItem.fat_total_g}</p>
                                        <hr />
                                        <h2 className="mt-5 text-blue-500">Carbs (g)</h2>
                                        <p>{foodItem.carbohydrates_total_g}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {saveButton()}
                    </>
                ) : (
                    <p className="text-center mt-48 text-2xl text-white">No nutrition information available for the specified food.</p>
                )}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react'

export default function FoodNutrition() {
    const [maxCalories, setMaxCalories] = useState("");
    const [maxProtein, setMaxProtein] = useState("");
    const [maxCarbs, setMaxCarbs] = useState("");
    const [maxFat, setMaxFat] = useState("");
    const [foodName, setFoodName] = useState("");

    const fetchData = async () => {
        const apiKey = 'b25c545350cc4fc2aa4d66705c89774d'; // Replace with your actual API key
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${foodName}&maxProtein=${maxProtein}&maxFat=${maxFat}&maxCarbs=${maxCarbs}&maxCalories=${maxCalories}&number=2&apiKey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            // setFoodData(data.results);
            console.log(data.results)
        } catch (error) {
            console.error(error);
            // setFoodData(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, [foodName, maxProtein, maxFat, maxCarbs, maxCalories]);

    return (
        <div className="food-nutrition-container mt-14 flex justify-center items-center" style={{ backgroundColor: 'grey' }}>
            <h1 className="text-center">Food Nutrition</h1>
            <div className="form-container-search" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <form>
                    <div>
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
                    </div>
                    <div>
                        <label htmlFor="calories" className="block">Max Calories</label>
                        <input
                            className="search-box input input-bordered input-primary mr-10"
                            onChange={(e) => setMaxCalories(e.target.value)}
                            type="text"
                            placeholder="Max Calories..."
                            id="calories"
                            name="calories"
                            value={maxCalories}
                        />
                    </div>
                    <div>
                        <label htmlFor="protein" className="block">Max Protein</label>
                        <input
                            className="search-box input input-bordered input-primary mr-10"
                            onChange={(e) => setMaxProtein(e.target.value)}
                            type="text"
                            placeholder="Max Protein..."
                            id="protein"
                            name="protein"
                            value={maxProtein}
                        />
                    </div>
                    <div>
                        <label htmlFor="fat" className="block">Max Fat</label>
                        <input
                            className="search-box input input-bordered input-primary mr-10"
                            onChange={(e) => setMaxFat(e.target.value)}
                            type="text"
                            placeholder="Max Fat..."
                            id="fat"
                            name="fat"
                            value={maxFat}
                        />
                    </div>
                    <div>
                        <label htmlFor="carb" className="block">Max Carb</label>
                        <input
                            className="search-box input input-bordered input-primary mr-10"
                            onChange={(e) => setMaxCarbs(e.target.value)}
                            type="text"
                            placeholder="Max Carb..."
                            id="carb"
                            name="carb"
                            value={maxCarbs}
                        />
                    </div>
                    <div>
                        <button onClick={() => fetchData()} className="btn btn-primary rounded inline-block mt-2 mb-2 drop-shadow-lg glow-btn">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from 'react'

export default function FoodNutrition() {
    const [search, setSearch] = useState("");

    const params = {
        api_key: 'vsoGvIu0Aea8umgAnSKcrfAx5G5cjfoEnUzQpgal',
        query: search,
        dataType: ["Survey (FNDDS)"],
        pagesize: 5,
    }

    const API_URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

    const handleGetData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className="food-nutrition-container mt-14" style={{ backgroundColor: 'grey' }}>
            <h1 className="text-center">Food Nutrition</h1>
            <form className="flex justify-center">
                <div className="join mt-10">
                    <input
                        className="search-box input input-bordered input-primary mr-10"
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        id="search"
                        name="search"
                    />
                    <button onClick={handleGetData} className="btn btn-primary rounded inline-block mt-2 mb-2 drop-shadow-lg glow-btn">Search</button>
                </div>
            </form>
        </div>
    )
}

import { Link } from "react-router-dom";
import { useState, useContext } from "react"
import { userContext } from '../userContext';

export default function Register() {
    const { user } = useContext(userContext);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const API_URL = import.meta.env.VITE_API_BACKEND_URL;

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log("inside the handle register function")

        if (password === confirmPassword) {
            console.log("Password's match!");
            console.log("Email: ", email)
            console.log("Username: ", username)
            console.log("Password: ", password)
            console.log("Confirm Password: ", confirmPassword)

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "username": username,
                    "password": password
                }),
            });
            // const data = await response.json();
            // console.log(data);
        }
    }

    return (
        <div className="registration-container">
            <div className="form-container mb-10" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {/* registration form here */}
                <h1 className="mb-20">Sign Up For An Account</h1>

                <form className="reg-form">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary-content">
                            Email *
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" className="input input-bordered input-info max-w-md mt-2" />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-primary-content mt-10">
                            Username *
                        </label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="input input-bordered input-info max-w-md mt-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-primary-content mt-10">
                            Create Password *
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="input input-bordered input-info max-w-md mt-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-content mt-10">
                            Confirm Password *
                        </label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="input input-bordered input-info  max-w-md mt-2" />
                    </div>
                    <p>* Required</p>
                    <div className="flex justify-center items-center">
                        <button onClick={handleRegister} className="btn btn-wide btn-circle btn-info rounded inline-block mt-8 drop-shadow-lg glow-btn"><strong>Sign Up</strong></button>
                    </div>
                </form>
            </div>
            <div className="info-container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {/* text content here */}
                <h1>Already have an account?</h1>
                <p className="mt-6">Login now to get started!</p>
                <button className="btn btn-wide btn-circle rounded inline-block mt-10 drop-shadow-lg glow-btn reg-btn-login"><Link to="/login">Login</Link></button>
            </div>
        </div>
    )
}

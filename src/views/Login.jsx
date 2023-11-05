import { Link } from 'react-router-dom';
import { useContext, useState } from 'react'
import { userContext } from '../userContext';

export default function Login() {
    const { user, setUser } = useContext(userContext)

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const API_URL = import.meta.env.VITE_API_BACKEND_URL;

    // when user is successfully logged in - use setUser to store them
    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("inside login function, making request now")

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                withCredentials: true
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": password
            })
        });
        setUser(username)
        console.log('user logged in', user)
    }
    
    return (
        <div className="registration-container">
            <div className="form-container mb-28" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* registration form here */}
                <h1 className='mb-5'>Login to Your Account</h1>
                <h5>Login using Google</h5>
                <i className="fa-brands fa-google-plus fa-3x mb-7 mt-7 google-icon" style={{ color: '#ff4d00' }}></i>
                <div className="horizontal-line mb-5">
                    <div className="line"></div>
                    <div className="or">OR</div>
                    <div className="line"></div>
                </div>
                <p>Sign in with your account</p>
                <form className='reg-form mt-1'>
                    {/* <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary-content">
                            Email
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" className="input input-bordered input-info max-w-md mt-2" />
                    </div> */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-primary-content mt-9">
                            Username 
                        </label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" className="input input-bordered input-info max-w-md mt-2" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-primary-content mt-10">
                            Password 
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="input input-bordered input-info max-w-md mt-2" />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button onClick={handleLogin} className="btn btn-wide btn-circle btn-info rounded inline-block mt-20 drop-shadow-lg glow-btn"><strong>Login</strong></button>
                    </div>
                </form>
            </div>
            <div className="info-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* text content here */}
                <h1>Don't have an account yet?</h1>
                <p className='mt-6'>Create one now and get started</p>
                <p>on your fitness journey!</p>
                <button className='btn btn-wide btn-circle rounded inline-block mt-10 drop-shadow-lg glow-btn reg-btn-login'><Link to='/register'>Create Account</Link></button>
            </div>
        </div>
    )
}

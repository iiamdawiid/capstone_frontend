import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../userContext';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { user, setUser } = useContext(userContext);
    const localStorageUser = localStorage.getItem("user");
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token")
        toast.success('You have been logged out')
        navigate('/');

        setTimeout(() => {
            window.location.reload();
        }, 2500);
    }

    return (
        <>
            {user || localStorageUser ? (
                <div className="navbar bg-indigo-600" style={{ width: '100vw' }}>
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to='/home'>Home</Link></li>
                                <li><Link to='/bmrcalculator'>BMR Calculator</Link></li>
                                <li><Link to='/onerepmax'>ORM Calculator</Link></li>
                                <li><Link to='/foodnutrition'>Nutrition Look-Up</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link to='/home' className="btn btn-ghost normal-case text-xl">REVAMP<i className="fa-solid fa-fire-flame-curved"></i></Link>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <i style={{ marginTop: '50%' }} className="fa-solid fa-circle-user fa-2xl"></i>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/editprofile" className="justify-between">
                                        Edit Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/savedcalories" className="justify-between">
                                        Saved Calories
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/savedmaxes" className="justify-between">
                                        Saved Maxes
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/savedfoodnutrition" className="justify-between">
                                        Saved Food Nutrition
                                    </Link>
                                </li>
                                <li>
                                    <button className="justify-between" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="navbar bg-indigo-600" style={{ width: '100vw' }}>
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link to='/register'>Register</Link></li>
                                <li><Link to='/login'>Login</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link to='/' className="btn btn-ghost normal-case text-xl">REVAMP<i className="fa-solid fa-fire-flame-curved"></i></Link>
                    </div>
                    <div className="navbar-end">
                    </div>
                </div>
            )}
        </>
    )
}

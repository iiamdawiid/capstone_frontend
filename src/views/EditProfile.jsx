import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [confirmUsername, setConfirmUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_BACKEND_URL;
    // const API_URL = 'http://127.0.0.1:5000';

    const logoutUser = (isDeleted) => {
        if (isDeleted) {
            localStorage.removeItem("user");
            localStorage.removeItem("token")
            toast.success('Profile deleted')
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.success('You have been logged out')
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }
    }

    const handleProfileDelete = async () => {
        const response = await fetch(`${API_URL}/auth/editprofile`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": newEmail,
                "username": newUsername,
                "password": newPassword,
                "delete_profile": true
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            logoutUser(true);
        }
    }

    const handleSaveChanges = async () => {
        let clear = true;

        if (newEmail) {
            if (newEmail !== confirmEmail) {
                toast.error("Email's do not match")
                clear = false;
            }
        }
        if (newUsername) {
            if (newUsername !== confirmUsername) {
                toast.error("Username's do not match")
                clear = false;
            }
        }
        if (newPassword) {
            if (newPassword !== confirmPassword) {
                toast.error("Password's do not match")
                clear = false;
            }
        }
        if (clear === true) {
            toast.success("SUCCESS")
            // call api to change info
            const response = await fetch(`${API_URL}/auth/editprofile`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": newEmail,
                    "username": newUsername,
                    "password": newPassword
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                logoutUser();
            }
        }
    }

    return (
        <>
            <div className="centered-container-editprofile">
                <h1 className="text-center text-4xl font-bold text-white" style={{ backgroundColor: 'black', color: 'white', padding: '20px 0', margin: '0', textAlign: 'center' }}>Edit Profile</h1>
                <div className="form-container-editprofile flex flex-col justify-center items-center">
                    <form>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-primary-content mt-5">
                                Email
                            </label>
                            <input onChange={(e) => setNewEmail(e.target.value)} type="text" name="email" id="email" className="input input-bordered input-info mt-2" />
                        </div>
                        <div>
                            <label htmlFor="confirmEmail" className="block text-sm font-medium text-primary-content mt-5">
                                Confirm Email
                            </label>
                            <input onChange={(e) => setConfirmEmail(e.target.value)} type="text" name="confirmEmail" id="confirmEmail" className="input input-bordered input-info mt-2" />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-primary-content mt-5">
                                Username
                            </label>
                            <input onChange={(e) => setNewUsername(e.target.value)} type="text" name="username" id="username" className="input input-bordered input-info mt-2" />
                        </div>
                        <div>
                            <label htmlFor="confirmUsername" className="block text-sm font-medium text-primary-content mt-5">
                                Confirm Username
                            </label>
                            <input onChange={(e) => setConfirmUsername(e.target.value)} type="text" name="confirmUsername" id="confirmUsername" className="input input-bordered input-info mt-2" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-primary-content mt-5">
                                Password
                            </label>
                            <input onChange={(e) => setNewPassword(e.target.value)} type="password" name="password" id="password" className="input input-bordered input-info mt-2" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-content mt-5">
                                Confirm Password
                            </label>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" className="input input-bordered input-info mt-2" />
                        </div>
                        <div className="mt-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" onClick={() => document.getElementById('my_modal_1').showModal()} className="btn-save-changes btn rounded inline-block mt-2 mb-2 drop-shadow-lg glow-btn">Save Changes</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">SAVE CHANGES</h3>
                                    <p className="py-4">Are you sure you want to save these changes?</p>
                                    <button onClick={handleSaveChanges} type="button" className="btn-save-changes btn rounded inline-block mt-2 mb-2 drop-shadow-lg glow-btn">Save</button>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                            <button type="button" onClick={() => document.getElementById('my_modal_2').showModal()} className="btn-delete-profile btn rounded inline-block mt-2 mb-2 drop-shadow-lg glow-btn">Delete Profile</button>
                            <dialog id="my_modal_2" className="modal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">WARNING!</h3>
                                    <p className="py-4">Deleting profile will result in all data being lost. Are you sure you want to delete?</p>
                                    <button onClick={handleProfileDelete} type="button" className="btn-delete-profile btn rounded inline-block mt-2 mb-2 drop-shadow-lg glow-btn">Delete</button>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

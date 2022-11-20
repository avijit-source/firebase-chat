import { signOut } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { ChatContext } from '../context/ChatContext';

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState("")

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user) {
            setUser(user.displayName)
        }
    }, [])
    return (
        <nav className="navbar bg-transparent sticky-top">
            <div className="container-fluid">
                {user && <p className="navbar-brand text-light">{user}</p>}
                <button className="btn btn-danger" onClick={() => {
                    signOut(auth);
                    localStorage.removeItem("userData");
                    navigate("/login");
                }}>logout</button>
            </div>
        </nav>
    )
}

export default Navbar
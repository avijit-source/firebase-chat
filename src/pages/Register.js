import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase"
import { doc, setDoc } from "firebase/firestore";


function Register() {

    const navigate = useNavigate()
    const [values, setValues] = useState({ email: "", password: "", username: "" })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, username } = values;
        if (!email || !password) {
            alert("Please enter email or psasword")
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(res.user, { displayName: username })
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: username,
                    email: email
                });
                await setDoc(doc(db, "userChats", res.user.uid), {})
                navigate("/login")
            } catch (e) {
                throw new Error(e)
            }
        }
    }
    return (
        <div className="formcontainer">
            <form className="formstyle" onSubmit={handleSubmit}>
                <h3 className="text-center text-dark">Register</h3>
                <div className="mb-3">
                    <label for="namefield" className="form-label">User name</label>
                    <input name="username" type="text" onChange={handleChange} className="form-control form-control-sm" id="namefield" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={handleChange} className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" type="password" onChange={handleChange} className="form-control form-control-sm" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <p className="mt-2">already have an account?<Link to="/login">login here</Link></p>
            </form>

        </div>
    )
}

export default Register
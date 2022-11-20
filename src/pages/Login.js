import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from "../config/firebase"

function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = values;
        if (!email || !password) {
            alert("Please enter email or psasword")
        } else {
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password)
                localStorage.setItem("userData", JSON.stringify(user))
                // localStorage.setItem("userData", JSON.stringify(res.user))
                navigate("/")
            } catch (e) {
                throw new Error(e)
            }
        }
    }
    return (
        <div className="formcontainer" onSubmit={handleSubmit}>
            <form className="formstyle">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input name="email" type="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className="mt-2">dont have an account?<Link to="/register">Register</Link></p>
            </form>
        </div>
    )
}

export default Login
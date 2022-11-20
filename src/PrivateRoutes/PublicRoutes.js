import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function
    PublicRoutes({ children, restricted }) {
    const [currentUser] = useState(JSON.parse(localStorage.getItem("userData")))

    if (currentUser && restricted) {
        return <Navigate to="/" />
    }
    return (
        <div>{children}</div>
    )
}

export default
    PublicRoutes
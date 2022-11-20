import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const [currentUser] = useState(JSON.parse(localStorage.getItem("userData")))

    if (!currentUser) {
        return <Navigate to="/login" />
    }
    return (
        <div>{children}</div>
    )
}

export default PrivateRoute
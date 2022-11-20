import React from 'react'
import Navbar from './Navbar'
import SearchUser from './SearchUser'

function Sidebar() {
    return (
        <div className="col-4 sidebar">
            <Navbar />
            <SearchUser />
        </div>
    )
}

export default Sidebar
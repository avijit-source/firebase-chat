import React from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

function HomePage() {
    return (
        <div className="home">
            <div class="row h-100" style={{ width: "100%", textAlign: "center" }}>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default HomePage
import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import MessageList from './MessageList'
import SendInput from './SendInput'

function Chat() {
    const { data } = useContext(ChatContext)

    return (
        <div className="col-8">
            <nav className="navbar bg-transparent sticky-top">
                <div className="container-fluid d-flex justify-content-end">
                    {/* <a className="text-light">User Name</a> */}
                    <h6 className="text-light me-3">{data?.user.displayName}</h6>
                </div>
            </nav>
            {data?.chatId !== "null" && (
                <div>
                    <MessageList />
                    <SendInput />
                </div>
            )}

        </div>
    )
}

export default Chat
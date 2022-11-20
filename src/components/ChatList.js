import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/firebase';
import { ChatContext } from '../context/ChatContext';

function ChatList() {
    const [chats, setChats] = useState([]);

    const { dispatch } = useContext(ChatContext)

    useEffect(() => {
        const { uid, displayName } = JSON.parse(localStorage.getItem('userData'));
        const unsub = onSnapshot(doc(db, "userChats", uid), (doc) => {
            setChats(doc.data());
        })

        return () => {
            unsub();
        }
    }, [])


    const handleChatSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }

    return (
        <div className="mt-3">
            <div className="list-group chats">
                {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <a key={chat[0]} onClick={() => handleChatSelect(chat[1].userInfo)} className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1">{chat[1].userInfo?.displayName}</h6>
                            <p className="mb-1">{chat[1]?.lastMessage?.text}</p>
                        </div>

                    </a>
                ))}

            </div>
        </div>
    )
}

export default ChatList
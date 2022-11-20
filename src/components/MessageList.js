import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { db } from '../config/firebase'
import { ChatContext } from '../context/ChatContext'
import timeago from 'epoch-timeago';

function MessageList() {

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)
    const [currentUser] = useState(JSON.parse(localStorage.getItem("userData")))

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
            }
        })

        return () => {
            unsub()
        }
    }, [data.chatId])

    console.log(messages, data)
    return (
        <div className="mt-3">
            <div className="list-group chatlist" ref={ref}>
                {messages?.map(m => (
                    <a key={m.id} className="list-group-item list-group-item-action d-flex w-100 align-items-center justify-content-end" aria-current="true">
                        <div className="w-100" style={{ textAlign: 'left' }}>
                            <h6 className="mb-1">{data.user.uid === m.senderId ? data.user.displayName : currentUser.displayName}</h6>
                            <p className="mb-1">{timeago(m.date.seconds * 1000)}</p>
                        </div>
                        <div className="d-flex w-100 justify-content-between" style={{ textAlign: "left" }}>
                            <p className="mb-1 fw-5">{m.text}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MessageList
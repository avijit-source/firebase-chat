import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext';
import { v4 as uuid } from "uuid"
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

function SendInput() {
    const [text, setText] = useState("")

    const [currentUser] = useState(JSON.parse(localStorage.getItem("userData")));

    const { data } = useContext(ChatContext);

    const handleMessageSend = async () => {
        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now()
            })
        })

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        setText("")

    }

    return (
        <nav className="navbar bg-transparent sticky-top">
            <div className="container-fluid d-flex justify-content-start flex-row">
                <input value={text} type="text" onChange={(e) => setText(e.target.value)} className="form-control navbar sticky-bottom me-2" style={{ width: "90%" }} placeholder="type a message" />
                <button className="btn btn-danger me-2" onClick={handleMessageSend}>send</button>
            </div>
        </nav>
    )
}

export default SendInput
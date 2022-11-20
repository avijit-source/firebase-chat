import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'

function SearchUser() {
    const [searchUserText, setSearchUserText] = useState("")
    const handleChange = (e) => {
        setSearchUserText(e.target.value)
    }
    const [searchUser, setSearchUser] = useState(null)




    const handleSearchUser = async () => {
        try {
            const q = query(collection(db, "users"), where("displayName", "==", searchUserText))

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (doc.exists) {
                    setSearchUser(doc.data())
                } else {
                    console.log("not dound")
                }
            });
        } catch (err) {
            throw new Error(err)
        }

    }

    const handleClickChat = async () => {
        const { uid, displayName } = JSON.parse(localStorage.getItem("userData"));
        const joinedId = uid > searchUser.uid ? searchUser.uid + uid : uid + searchUser.uid
        console.log(joinedId)
        try {

            const res = await getDoc(doc(db, "chats", joinedId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", joinedId), { messages: [] })

                await updateDoc(doc(db, "userChats", uid), {
                    [joinedId + ".userInfo"]: {
                        uid: searchUser.uid,
                        displayName: searchUser.displayName
                    },
                    [joinedId + ".date"]: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", searchUser.uid), {
                    [joinedId + ".userInfo"]: {
                        uid: uid,
                        displayName: displayName
                    },
                    [joinedId + ".date"]: serverTimestamp()
                })
            }
            setSearchUser(null);
            setSearchUserText("")

        } catch (err) {
            setSearchUser(null);
            setSearchUserText("")
        }
        // const res  = await getDoc(db,"users",)

    }
    return (
        <div>
            <div className="d-flex">
                <input onChange={handleChange} value={searchUserText} type="search" className="form-control" placeholder="search user" style={{ width: "85%" }} />
                <button onClick={handleSearchUser} className="btn btn-primary btn-sm">search</button>
            </div>
            {
                searchUser && (
                    <div className="mt-3">
                        <div className="list-group chats" onClick={handleClickChat}>
                            <a className="list-group-item list-group-item-action" aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{searchUser && searchUser.displayName}</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                )
            }
            <ChatList />
        </div>
    )
}

export default SearchUser
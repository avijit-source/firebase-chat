import { createContext, useEffect, useReducer, useState } from "react";

export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const currentUser = JSON.parse(localStorage.getItem("userData"));


    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? action.payload.uid + currentUser.uid : currentUser.uid + action.payload.uid
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}


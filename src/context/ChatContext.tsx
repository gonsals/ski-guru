// // context/ChatContext.tsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { db } from "../firebase";
// import {
//     onSnapshot,
//     collection,
//     query,
//     where,
//     Timestamp,
// } from "firebase/firestore";

// export interface Chat {
//     chatId: string;
//     user: {
//         uid: string;
//         name: string;
//     };
//     messages: Message[];
// }

// export interface Message {
//     id: string;
//     text: string;
//     senderId: string | undefined;
//     date: Timestamp;
//     img?: string;
// }

// interface ChatContextType {
//     data: Chat | null;
//     setData: React.Dispatch<React.SetStateAction<Chat | null>>;
// }

// const ChatContext = createContext<ChatContextType>({
//     data: null,
//     setData: () => {},
// });

// export const ChatProvider: React.FC = ({ children }) => {
//     const [data, setData] = useState<Chat | null>(null);

//     useEffect(() => {
//         const unsubscribe = onSnapshot(
//             query(
//                 collection(db, "chats"),
//                 where("user.uid", "==", "currentUserId") // Reemplaza "currentUserId" con el ID del usuario actual
//             ),
//             (snapshot) => {
//                 if (!snapshot.empty) {
//                     snapshot.forEach((doc) => {
//                         setData({
//                             chatId: doc.id,
//                             ...doc.data(),
//                         } as Chat);
//                     });
//                 } else {
//                     setData(null);
//                 }
//             }
//         );

//         return () => unsubscribe();
//     }, []);

//     return (
//         <ChatContext.Provider value={{ data, setData }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };

// export const useChat = () => useContext(ChatContext);

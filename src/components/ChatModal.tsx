// // components/ChatModal.tsx
// import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
// import Input from "./Input"; // El componente de Input que ya tienes implementado
// import { Chat, Message } from "../context/ChatContext";
// import { db } from "../firebase";
// import { collection, query, where, onSnapshot } from "firebase/firestore";

// interface ChatModalProps {
//     onClose: () => void;
// }

// const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
//     const { data } = useChat();
//     const [messages, setMessages] = useState<Message[]>([]);

//     useEffect(() => {
//         if (data) {
//             const unsubscribe = onSnapshot(
//                 query(
//                     collection(db, "chats", data.chatId, "messages")
//                     // Limita los mensajes o añade filtros adicionales si es necesario
//                 ),
//                 (snapshot) => {
//                     const fetchedMessages: Message[] = [];
//                     snapshot.forEach((doc) => {
//                         fetchedMessages.push({
//                             id: doc.id,
//                             ...doc.data(),
//                         } as Message);
//                     });
//                     setMessages(fetchedMessages);
//                 }
//             );

//             return () => unsubscribe();
//         }
//     }, [data]);

//     return (
//         <Modal onClose={onClose}>
//             <div className="chat-modal">
//                 <h2>Chat with {data?.user.name}</h2>
//                 <div className="messages">
//                     {messages.map((message) => (
//                         <div key={message.id} className="message">
//                             <p>{message.text}</p>
//                             {message.img && (
//                                 <img src={message.img} alt="Attached" />
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <Input />
//             </div>
//         </Modal>
//     );
// };

// export default ChatModal;

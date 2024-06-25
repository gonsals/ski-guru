// // components/Input.tsx
// import Attach from "../../img/attach.png";
// import { Message } from "../context/ChatContext";
// import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../firebase";
// import {
//     doc,
//     updateDoc,
//     serverTimestamp,
//     arrayUnion,
// } from "firebase/firestore";
// import { useState, ChangeEvent } from "react";

// interface InputProps {
//     chatId: string; 
// }

// const Input: React.FC<InputProps> = ({ chatId }) => {
//     const [text, setText] = useState<string>("");
//     const [img, setImg] = useState<File | undefined>();

//     const handleSend = async () => {
//         try {
//             if (!text.trim() && !img) {
//                 return;
//             }

//             if (img) {
//                 const storageRef = ref(storage, uuid());
//                 const uploadTask = uploadBytesResumable(storageRef, img);

//                 uploadTask.on(
//                     "state_changed",
//                     (snapshot) => {
//                         // Puedes manejar el progreso de la carga si lo necesitas
//                     },
//                     () => {
//                         toast.error("Error uploading image");
//                     },
//                     async () => {
//                         const downloadURL = await getDownloadURL(
//                             uploadTask.snapshot.ref
//                         );
//                         sendMessage({ text, img: downloadURL });
//                     }
//                 );
//                 setImg(undefined);
//             } else {
//                 sendMessage({ text });
//             }

//             setText("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//             toast.error("Failed to send message");
//         }
//     };

//     const sendMessage = async (message: Message) => {
//         try {
//             const messageRef = doc(db, "chats", chatId);
//             await updateDoc(messageRef, {
//                 messages: arrayUnion({
//                     ...message,
//                     senderId: currentUser?.uid,
//                     date: serverTimestamp(),
//                 }),
//             });

//             // Actualizar el último mensaje en los chats de los usuarios
//             const userChatRef = doc(db, "userChats", currentUser?.uid);
//             await updateDoc(userChatRef, {
//                 [chatId + ".lastMessage"]: {
//                     ...message,
//                     senderId: currentUser?.uid,
//                 },
//                 [chatId + ".date"]: serverTimestamp(),
//             });

//             const recipientChatRef = doc(db, "userChats", recipientUid); // Asegúrate de obtener el ID del destinatario
//             await updateDoc(recipientChatRef, {
//                 [chatId + ".lastMessage"]: {
//                     ...message,
//                     senderId: currentUser?.uid,
//                 },
//                 [chatId + ".date"]: serverTimestamp(),
//             });
//         } catch (error) {
//             console.error("Error updating chat:", error);
//             toast.error("Failed to update chat");
//         }
//     };

//     const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setText(e.target.value);
//     };

//     const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setImg(e.target.files[0]);
//         }
//     };

//     return (
//         <div className="flex items-center justify-between py-2 px-4 border-t border-gray-300">
//             <input
//                 type="text"
//                 placeholder="Type something..."
//                 value={text}
//                 onChange={handleTextChange}
//                 className="w-full p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
//             />
//             <div className="flex items-center space-x-2">
//                 <label htmlFor="file">
//                     <img src={Attach} alt="Attach" className="cursor-pointer" />
//                 </label>
//                 <input
//                     type="file"
//                     style={{ display: "none" }}
//                     id="file"
//                     onChange={handleImageChange}
//                 />
//                 <button
//                     onClick={handleSend}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Input;

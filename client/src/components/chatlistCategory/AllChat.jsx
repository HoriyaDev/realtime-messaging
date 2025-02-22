

import React, { useEffect, useState } from "react";

import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useChat } from "../../context/ChatContext";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  where,
  getDocs,
  addDoc,
  setDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore"; 

const AllChat = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedUser } = useChat(); // Use Context to set selected user

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const q = query(collection(db, "users"));

      const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
        const allUsers = querySnapshot.docs.map((doc) => doc.data());

        // Filter out the currently logged-in user
        const filteredUsers = allUsers.filter(
          (user) => user.LoggedUserId !== currentUser.uid
        );

        setUsers(filteredUsers);
        setLoading(false);
      });

      return () => unsubscribeFirestore();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleClick = async (user) => {
    const currentUser = auth.currentUser;
    setSelectedUser(user);

    if (!currentUser) {
        console.error("No user is currently logged in.");
        return;
    }

    console.log("Current User UID:", currentUser.uid);
    console.log("Selected User UID:", user.LoggedUserId);

    const selectedPerson = user.LoggedUserId;
    const chatRoomId = generateChatRoom(currentUser.uid, selectedPerson);
    console.log("Chat Room ID:", chatRoomId);

    try {
        // Fetch current user's name
        const q = query(
            collection(db, "users"),
            where("LoggedUserId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error("Current user not found in Firestore.");
            return;
        }

        const userData = querySnapshot.docs[0].data();
        const currentUserName = userData.name || "Unknown";

        console.log("Fetched User Name:", currentUserName);

        // Check if chat room already exists
        const chatRef = doc(db, "chatRooms", chatRoomId);
        const chatDoc = await getDoc(chatRef);

        if (!chatDoc.exists()) {
            // Create new chat room
            await setDoc(chatRef, {
                id: chatRoomId,
                user1: currentUserName,
                user2: user.name || "Unknown",
                createdAt: serverTimestamp(),
            });

            console.log("Chat room created successfully!");
        } else {
            console.log("Chat room already exists.");
        }

        // Create a messages subcollection inside the chat room
        const messageRef = doc(db, "chatRooms", chatRoomId, "messages", "initialMessage");

        await setDoc(messageRef, {
            message: "Hello World",
            senderId: currentUser.uid,
            timestamp: serverTimestamp(),
        });

        console.log("Message subcollection created successfully!");

    } catch (error) {
        console.error("Error creating chat room or messages:", error);
    }
};
    
    // generate chat room
      const generateChatRoom = (uid1, uid2) => {
        const UIDSArray = [uid1, uid2].sort((a, b) => a.localeCompare(b));
    
        const sortedUIDS = `${UIDSArray[0]}_${UIDSArray[1]}`;
        return sortedUIDS;
      };
    
    



  if (loading) return <p>Loading users...</p>;

  return (
    <div className="h-[500px] overflow-y-auto p-2">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.LoggedUserId}
            className="flex gap-4 mt-3 p-2 border-b cursor-pointer"
            // onClick={() => setSelectedUser(user)} 
            
            onClick={() => handleClick(user)}// Set selected user in context
          >
            <p className="font-semibold">{user.name}</p>
          </div>
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default AllChat;

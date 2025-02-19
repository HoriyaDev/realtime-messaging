import React, { useEffect, useState } from "react";
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
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AllChat = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seletedUser, setSelectedUser] = useState();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No user is logged in.");
        setLoading(false);
        return;
      }

      console.log("Current User UID:", currentUser.uid);

      const q = query(collection(db, "users"));

      // Real-time listener using onSnapshot
      const unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
        const allUsers = querySnapshot.docs.map((doc) => doc.data());
        console.log("Fetched Users:", allUsers);

        // Filter out the currently logged-in user
        const filteredUsers = allUsers.filter(
          (user) => user.LoggedUserId !== currentUser.uid
        );

        console.log("Filtered Users:", filteredUsers);
        setUsers(filteredUsers);
        setLoading(false);
      });

      // Cleanup Firestore listener
      return () => unsubscribeFirestore();
    });

    // Cleanup auth listener
    return () => unsubscribeAuth();
  }, []);

  if (loading) {
    return <p className="text-gray-500 dark:text-white">Loading users...</p>;
  }

  const handleClick = async (user) => {
    const currentUser = auth.currentUser;
    console.log("current_user", currentUser.uid);

    console.log("selected-user", user.LoggedUserId);

    const selectedPerson = user.LoggedUserId;
    const chatRoomId = generateChatRoom(currentUser.uid, selectedPerson);
    console.log("Chat Room ID:", chatRoomId);

    const chatRef = doc(db, "chatRooms", chatRoomId); // Ensure "chatRooms" is your collection name
    await setDoc(chatRef, {
      id: chatRoomId,
      user1: user.name,
      user2: currentUser.displayName,
    });

    console.log(chatRef);
  };

  const generateChatRoom = (uid1, uid2) => {
    const UIDSArray = [uid1, uid2].sort((a, b) => a.localeCompare(b));

    const sortedUIDS = `${UIDSArray[0]}_${UIDSArray[1]}`;
    return sortedUIDS;
  };

  return (
    <div className="h-[500px] overflow-y-auto scrollbar-custom p-2">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.LoggedUserId}
            className="flex gap-4 mt-3 p-2 border-b cursor-pointer"
          >
            <div onClick={() => handleClick(user)}>
              <p className="font-semibold dark:text-white">{user.name}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-white">No users available</p>
      )}
    </div>
  );
};

export default AllChat;

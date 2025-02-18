import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";

const AllChat = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("No user is logged in.");
      setLoading(false);
      return;
    }

    console.log("Current User UID:", currentUser.uid);

    // Create a Firestore query
    const q = query(collection(db, "users"));

    // Real-time listener using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-gray-500 dark:text-white">Loading users...</p>;
  }

  return (
    <div className="h-[500px] overflow-y-auto scrollbar-custom p-2">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.LoggedUserId} className="flex gap-4 mt-3 p-2 border-b">
            <div>
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

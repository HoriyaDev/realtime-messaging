import React, { useState } from "react";
import ProfileModal from "../modal/ProfileModal";

const Profile = () => {
  const [open, setOpen] = useState(false);

  const handleToggleModal = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <button type="button" onClick={handleToggleModal }>
        <img
          src="Profile.jpg"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>

      <ProfileModal open={open} />
    </>
  );
};

export default Profile;

import { useState } from "react";

export const useProfile = (initialProfile) => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  const startEditing = () => setEditing(true);
  const saveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditing(false);
  };

  return {
    profile,
    editing,
    startEditing,
    saveProfile,
  };
};

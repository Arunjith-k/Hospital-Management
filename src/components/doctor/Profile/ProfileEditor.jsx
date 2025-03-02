import React, { useState } from "react";

const ProfileEditor = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile submission logic here
    console.log("Profile Updated:", profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea name="bio" value={profile.bio} onChange={handleChange} />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default ProfileEditor;

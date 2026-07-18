import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    experience: "",
    skills: "",
    profileImage: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);
const [editing, setEditing] = useState(false);
  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");

      setFormData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        location: res.data.location || "",
        bio: res.data.bio || "",
        experience: res.data.experience || "",
        skills: (res.data.skills || []).join(", "),
        profileImage: res.data.profileImage || "",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      await api.put("/users/profile", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      alert("Profile updated successfully!");
    } catch (err) {
  console.log(err.response?.data || err.message);
  alert(err.response?.data?.message || err.message);
}
  };

  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
      <h2>My Profile</h2>

<div
  style={{
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  }}
>
  <img
    src={formData.profileImage || "https://i.pravatar.cc/200"}
    alt="Profile"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #2563eb",
      marginBottom: "15px",
    }}
  />

  <h2>{formData.name}</h2>

  <p>{formData.email}</p>

  <p>
    📍 {formData.location || "Not Added"}
  </p>

  <p>
    📞 {formData.phone || "Not Added"}
  </p>

  <p>
    💼 {formData.experience || "0"} Years Experience
  </p>

  <p>
    🛠 {formData.skills || "No Skills"}
  </p>

  <p
    style={{
      color: "#555",
      marginTop: "10px",
    }}
  >
    {formData.bio}
  </p>
</div>
{formData.profileImage && (
  <div
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    <img
      src={formData.profileImage}
      alt="Profile"
      style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #2563eb",
      }}
    />
  </div>
)}
      {editing && (
<form onSubmit={saveProfile}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="email"
          value={formData.email}
          disabled
          style={inputStyle}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          style={inputStyle}
        />
<input
  name="profileImage"
  placeholder="Profile Image URL"
  value={formData.profileImage}
  onChange={handleChange}
  style={inputStyle}
/>
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          rows={5}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "12px 25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Profile
        </button>
        <button
  type="button"
  onClick={() => setEditing(false)}
  style={{
    marginLeft: "10px",
    padding: "12px 25px",
    background: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Cancel
</button>
        <button
  onClick={() => setEditing(true)}
  style={{
    padding: "10px 20px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  Edit Profile
</button>
      </form>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export default Profile;
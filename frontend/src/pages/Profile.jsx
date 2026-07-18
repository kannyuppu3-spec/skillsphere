import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [editing, setEditing] = useState(false);

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

      toast.success("Profile Updated Successfully!");

      setEditing(false);

      fetchProfile();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Unable to update profile.");
    }
  };
const fields = [
  formData.name,
  formData.phone,
  formData.location,
  formData.bio,
  formData.experience,
  formData.skills,
  formData.profileImage,
];

const completed = fields.filter(
  (field) => field && field.toString().trim() !== ""
).length;

const percentage = Math.round((completed / fields.length) * 100);
  return (
    <div style={{ maxWidth: "700px", margin: "30px auto" }}>
      <h2>My Profile</h2>

      {/* Profile Card */}

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          marginBottom: "25px",
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

        <p>📍 {formData.location || "Not Added"}</p>

        <p>📞 {formData.phone || "Not Added"}</p>

        <p>💼 {formData.experience || "0"} Years Experience</p>

        <p>🛠 {formData.skills || "No Skills"}</p>

        <p
          style={{
            color: "#555",
            marginTop: "10px",
          }}
        >
          {formData.bio || "No bio added"}
        </p>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Edit Form */}

      {editing && (
        <form onSubmit={saveProfile}>
          <div
  style={{
    marginTop: "15px",
    marginBottom: "20px",
  }}
>
  <strong>Profile Completion: {percentage}%</strong>

  <div
    style={{
      width: "100%",
      background: "#ddd",
      height: "10px",
      borderRadius: "20px",
      marginTop: "8px",
    }}
  >
    <div
      style={{
        width: `${percentage}%`,
        background: "#22c55e",
        height: "10px",
        borderRadius: "20px",
        transition: "0.4s",
      }}
    />
  </div>
</div>
{percentage === 100 ? (
  <p style={{ color: "green", fontWeight: "bold" }}>
    ✅ Profile Completed
  </p>
) : (
  <p style={{ color: "orange" }}>
    Complete your profile to increase hiring chances.
  </p>
)}
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
            placeholder="HTML, CSS, React"
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
            rows={5}
            value={formData.bio}
            onChange={handleChange}
            style={inputStyle}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              type="submit"
              style={saveButton}
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={() => setEditing(false)}
              style={cancelButton}
            >
              Cancel
            </button>
          </div>
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
  boxSizing: "border-box",
};

const saveButton = {
  padding: "12px 24px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelButton = {
  padding: "12px 24px",
  background: "#6b7280",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Profile;
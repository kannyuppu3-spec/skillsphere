import { useEffect, useState } from "react";
import api from "../services/api";

function Portfolio() {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    liveDemo: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/portfolio/my");
      setProjects(res.data.projects);
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

  const addProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/portfolio", {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      });

      alert("Project Added Successfully");

      setFormData({
        title: "",
        description: "",
        technologies: "",
        github: "",
        liveDemo: "",
        image: "",
        category: "",
      });

      fetchProjects();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to add project");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/portfolio/${id}`);
      fetchProjects();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto" }}>
      <h2>My Portfolio</h2>

      <form onSubmit={addProject}>
        <input
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          style={inputStyle}
          required
        />

        <input
          name="technologies"
          placeholder="React, Node.js, MongoDB"
          value={formData.technologies}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="liveDemo"
          placeholder="Live Demo URL"
          value={formData.liveDemo}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Project
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No portfolio projects yet.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <p>
              <strong>Category:</strong> {project.category}
            </p>

            <p>
              <strong>Technologies:</strong>{" "}
              {project.technologies?.join(", ")}
            </p>

            {project.github && (
              <p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </p>
            )}

            {project.liveDemo && (
              <p>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>
              </p>
            )}

            <button
              onClick={() => deleteProject(project._id)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

export default Portfolio;
import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";

function Resume() {
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/users/profile");
      setProfile(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/portfolio/my");
      setProjects(res.data.projects || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(profile.name || "Resume", 20, y);

    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Email : ${profile.email || ""}`, 20, y);
    y += 8;

    doc.text(`Phone : ${profile.phone || ""}`, 20, y);
    y += 8;

    doc.text(`Location : ${profile.location || ""}`, 20, y);
    y += 8;

    doc.text(
      `Experience : ${profile.experience || 0} Years`,
      20,
      y
    );

    y += 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Professional Summary", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const bio = profile.bio || "No professional summary added.";

    const bioLines = doc.splitTextToSize(bio, 170);

    doc.text(bioLines, 20, y);

    y += bioLines.length * 7 + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Technical Skills", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");

    const skills = Array.isArray(profile.skills)
      ? profile.skills.join(", ")
      : profile.skills || "No Skills";

    const skillLines = doc.splitTextToSize(skills, 170);

    doc.text(skillLines, 20, y);

    y += skillLines.length * 7 + 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Portfolio Projects", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    if (projects.length === 0) {
      doc.text("No Projects Added", 20, y);
    } else {
      projects.forEach((project, index) => {
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}. ${project.title}`, 20, y);

        y += 7;

        doc.setFont("helvetica", "normal");

        const desc = doc.splitTextToSize(
          project.description || "",
          165
        );

        doc.text(desc, 25, y);

        y += desc.length * 7 + 6;

        if (project.technologies) {
          doc.text(
            `Tech: ${
              Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : project.technologies
            }`,
            25,
            y
          );

          y += 8;
        }

        if (y > 260) {
          doc.addPage();
          y = 20;
        }
      });
    }

    doc.save("SkillSphere_Resume.pdf");
  };

  const printResume = () => {
    window.print();
  };
  return (
  <div
    id="resume"
    style={{
      maxWidth: "900px",
      margin: "30px auto",
      background: "#fff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
      fontFamily: "Arial, sans-serif",
    }}
  >
    {/* Header */}
    <div
      style={{
        background: "#2563eb",
        color: "#fff",
        padding: "40px",
        display: "flex",
        alignItems: "center",
        gap: "25px",
      }}
    >
      <img
        src={profile.profileImage || "https://i.pravatar.cc/200"}
        alt="Profile"
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid white",
        }}
      />

      <div>
        <h1 style={{ margin: 0 }}>{profile.name}</h1>

        <p>{profile.email}</p>

        <p>
          📞 {profile.phone || "Not Added"} &nbsp; | &nbsp;
          📍 {profile.location || "Not Added"}
        </p>

        <p>
          💼 {profile.experience || 0} Years Experience
        </p>
      </div>
    </div>

    {/* Buttons */}
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
      }}
    >
      <button
        onClick={downloadPDF}
        style={{
          background: "#16a34a",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        📄 Download PDF
      </button>

      <button
        onClick={printResume}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 22px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🖨 Print Resume
      </button>
    </div>

    <div style={{ padding: "35px" }}>
      {/* Summary */}
      <h2 style={{ color: "#2563eb" }}>Professional Summary</h2>

      <p style={{ lineHeight: "1.8" }}>
        {profile.bio || "No professional summary added."}
      </p>

      <hr />

      {/* Skills */}
      <h2 style={{ color: "#2563eb" }}>Technical Skills</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {(Array.isArray(profile.skills)
          ? profile.skills
          : (profile.skills || "").split(",")
        )
          .filter(Boolean)
          .map((skill, index) => (
            <span
              key={index}
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "8px 15px",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {skill.trim()}
            </span>
          ))}
      </div>

      <hr style={{ marginTop: "30px" }} />

      {/* Projects */}
      <h2 style={{ color: "#2563eb" }}>Portfolio Projects</h2>

      {projects.length === 0 ? (
        <p>No Portfolio Projects Added.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            {project.technologies && (
              <p>
                <strong>Technologies:</strong>{" "}
                {Array.isArray(project.technologies)
                  ? project.technologies.join(", ")
                  : project.technologies}
              </p>
            )}

            {project.githubUrl && (
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.githubUrl}
                </a>
              </p>
            )}

            {project.projectUrl && (
              <p>
                <strong>Live Demo:</strong>{" "}
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.projectUrl}
                </a>
              </p>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);
}
  

export default Resume;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login Successful!");

      if (res.data.user.role === "client") {
  navigate("/client-dashboard");
} else if (res.data.user.role === "freelancer") {
  navigate("/dashboard");
} else if (res.data.user.role === "admin") {
  navigate("/admin-dashboard");
}
    } catch (err) {
  console.log("Full Error:", err);
  console.log("Response:", err.response);
  console.log("Request:", err.request);
  console.log("Message:", err.message);

  if (err.response) {
    alert(err.response.data.message);
  } else {
    alert(err.message);
  }
}
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
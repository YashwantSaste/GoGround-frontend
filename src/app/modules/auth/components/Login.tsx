import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/Auth.tsx";
import axios from "axios";
import clsx from "clsx";
const API_URL = import.meta.env.VITE_APP_API_URL

interface LoginBasicInfo {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  // Form Validation
  const isFormValid = () => {
    if (!email || !password || !type) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid()) return;

    const loginData: LoginBasicInfo = { email, password };

    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        saveAuth({ withCredentials: true });

        const sessionResponse = await axios.get(`${API_URL}/api/session`, {
          withCredentials: true,
        });

        if (sessionResponse.status === 200 && sessionResponse.data.roles) {
          const roles = sessionResponse.data.roles;
          console.log(type);
          console.log(roles[0]);
          localStorage.setItem("type", type!); // Store the selected service type
          localStorage.setItem("role", roles[0]); // Store the user role

          redirectToHomePage(type!, roles[0]); // Ensure type is non-null
        } else {
          setError("Unable to fetch session data.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials or login error.");
    }
  };

  const redirectToHomePage = (serviceType: string, role: string) => {
    const userRoutes: Record<string, string> = {
      water: "/water/user",
      air: "/air/user",
      ground: "/UserDashBoardGround",
    };

    const adminRoutes: Record<string, string> = {
      water: "/water/admin",
      air: "/air/admin",
      ground: "/Ground/AdminDashboard",
    };

    const routes = role === "ROLE_USER" ? userRoutes : adminRoutes;

    if (routes[serviceType]) {
      navigate(routes[serviceType]);
    } else {
      setError("Invalid role or service type.");
    }
  };

  return (
    <form className="form w-100 p-4" noValidate id="login_form" onSubmit={handleLogin}>
      <h1 className="text-center mb-4">Login</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx("form-control", {
            "is-invalid": error && !email,
            "is-valid": email && !error,
          })}
        />
        {error && !email && <div className="invalid-feedback">Email is required</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={clsx("form-control", {
            "is-invalid": error && !password,
            "is-valid": password && !error,
          })}
        />
        {error && !password && <div className="invalid-feedback">Password is required</div>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px" }}>
        {["ground", "water", "air"].map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => setType(service)}
            className="btn"
            style={{
              backgroundColor: service === "ground" ? "#8B4513" : service === "water" ? "#1E90FF" : "#228B22",
              color: "#fff",
            }}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", color: "#fff" }}>
          Submit
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => navigate("/auth/register")}
          className="btn btn-light-primary w-100"
        >
          Cancel
        </button>
      </div>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => navigate("/auth/registration")}
          className="text-blue-500 hover:underline"
        >
          Don't have an account? Sign up here
        </button>
      </div>
    </form>
  );
};

export default Login;

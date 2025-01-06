import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/core/Auth";
import axios from "axios";

interface LoginBasicInfo {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("water");
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

    // Validate form inputs
    if (!isFormValid()) return;

    const loginData: LoginBasicInfo = { email, password };

    try {
      // Send login request to the server
      const response = await axios.post("http://localhost:8080/login", loginData, {
        withCredentials: true, // Include cookies in the request
      });

      // Assuming server response indicates successful login
      if (response.status === 200) {
        saveAuth({ withCredentials: true }); // Update auth state

        // Navigate based on the service type
        navigateToHomePage(type);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials or login error.");
    }
  };

  // Navigate user based on selected service type
  const navigateToHomePage = (serviceType: string) => {
    switch (serviceType) {
      case "water":
        navigate("/home");
        break;
      case "air":
        navigate("/air/homepage");
        break;
      case "ground":
        navigate("/Ground/homepage");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Service Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="water">Water</option>
            <option value="air">Air</option>
            <option value="ground">Ground</option>
          </select>
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

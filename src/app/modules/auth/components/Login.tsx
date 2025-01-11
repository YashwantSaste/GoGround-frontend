// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../auth/core/Auth";
// import axios from "axios";
//
// interface LoginBasicInfo {
//   email: string;
//   password: string;
// }
//
// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [type, setType] = useState("water");
//   const [error, setError] = useState<string | null>(null);
//   const { saveAuth } = useAuth();
//   const navigate = useNavigate();
//
//   // Form Validation
//   const isFormValid = () => {
//     if (!email || !password || !type) {
//       setError("Please fill in all fields.");
//       return false;
//     }
//     return true;
//   };
//
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//
//     // Validate form inputs
//     if (!isFormValid()) return;
//
//     const loginData: LoginBasicInfo = { email, password };
//
//     try {
//       // Send login request to the server
//       const response = await axios.post("http://localhost:8080/login", loginData, {
//         withCredentials: true, // Include cookies in the request
//       });
//
//       // Assuming server response indicates successful login
//       if (response.status === 200) {
//         saveAuth({ withCredentials: true }); // Update auth state
//
//         // Navigate based on the service type
//         navigateToHomePage(type);
//       } else {
//         setError("Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError("Invalid credentials or login error.");
//     }
//   };
//
//   // Navigate user based on selected service type
//   const navigateToHomePage = (serviceType: string) => {
//     switch (serviceType) {
//       case "water":
//         navigate("/home");
//         break;
//       case "air":
//         navigate("/air/homepage");
//         break;
//       case "ground":
//         navigate("/Ground/homepage");
//         break;
//       default:
//         navigate("/");
//     }
//   };
//
//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Email</label>
//           <input
//           id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="abc@gmail.com"
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Password</label>
//           <input
//           id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="********"
//             required
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Service Type</label>
//           <select
//           id="type"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="water">Water</option>
//             <option value="air">Air</option>
//             <option value="ground">Ground</option>
//           </select>
//         </div>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
//         >
//           Login
//         </button>
//       </form>
//       <div className="text-center mt-4">
//         <button
//           type="button"
//           onClick={() => navigate("/auth/registration")}
//           className="text-blue-500 hover:underline"
//         >
//           Don't have an account? Sign up here
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default Login;


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

    if (!isFormValid()) return;

    const loginData: LoginBasicInfo = { email, password };

    try {
      // Step 1: Send login request
      const response = await axios.post("http://localhost:8080/login", loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        saveAuth({ withCredentials: true });

        // Step 2: Fetch session data
        const sessionResponse = await axios.get("http://localhost:8080/api/session", {
          withCredentials: true,
        });

        if (sessionResponse.status === 200 && sessionResponse.data.roles) {
          const roles = sessionResponse.data.roles;

          // Step 3: Redirect user based on role and service type
          redirectToHomePage(type, roles[0]); // Pass service type and role
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
    if (role === "ROLE_USER") {
      switch (serviceType) {
        case "water":
          navigate("/water/user");
          break;
        case "air":
          navigate("/air/user");
          break;
        case "ground":
          navigate("/Ground/busbooking");
          break;
        default:
          navigate("/");
      }
    } else if (role === "ROLE_ADMIN") {
      switch (serviceType) {
        case "water":
          navigate("/water/admin");
          break;
        case "air":
          navigate("/air/admin");
          break;
        case "ground":
          navigate("/Ground/AdminDashboard");
          break;
        default:
          navigate("/");
      }
    } else {
      setError("Invalid role.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-gray-700">Service Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="water">Water</option>
            <option value="air">Air</option>
            <option value="ground">Ground</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => navigate("/auth/registration")}
          className="text-blue-500 hover:underline"
        >
          Don't have an account? Sign up here
        </button>
      </div>
    </div>
  );
};

export default Login;

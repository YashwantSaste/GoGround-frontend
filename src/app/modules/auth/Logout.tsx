// import {useEffect} from 'react'
// import {Navigate, Routes} from 'react-router-dom'
// import {useAuth} from './core/Auth'

// export function Logout() {
//   const {logout} = useAuth()
//   useEffect(() => {
//     logout()
//     document.location.reload()
//   }, [logout])

//   return (
//     <Routes>
//       <Navigate to='/auth/login' />
//     </Routes>
//   )
// }


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./core/Auth";

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch("http://localhost:8080/logout", {
          method: "POST",
          credentials: "include",
        });
        logout();
        navigate("/auth/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    handleLogout();
  }, [logout, navigate]);

  return null;
}

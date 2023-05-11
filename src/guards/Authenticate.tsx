import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthenticateTrue() {
  const token = localStorage.getItem("token");
  if (token === null || token === undefined || token === "") {
    console.log("token is empty");
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

function AuthenticateFalse() {
  const token = localStorage.getItem("token");
  if (token !== null && token !== undefined && token !== "") {
    console.log("token is not empty");
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <Outlet />;
}

export { AuthenticateTrue, AuthenticateFalse };

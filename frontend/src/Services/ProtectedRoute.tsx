import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = useSelector((state: any) => state.jwt);
  if (!token) {
    return <Navigate to="/login/" />;
  }
  const decoded: any = jwtDecode(token);
  if (allowedRoles && !allowedRoles.includes(decoded.applicantType))
    return <Navigate to="/unauthorized/" />;
  return children;
};

export default ProtectedRoute;
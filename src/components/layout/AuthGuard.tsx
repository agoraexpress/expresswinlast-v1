import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAdmin = false,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // For development - use localStorage authentication
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (!isLoggedIn) {
      navigate(requireAdmin ? "/admin-login" : "/user-login");
      return;
    }

    if (requireAdmin && !isAdmin) {
      navigate("/admin-login");
      return;
    }
  }, [navigate, requireAdmin]);

  return <>{children}</>;
};

export default AuthGuard;

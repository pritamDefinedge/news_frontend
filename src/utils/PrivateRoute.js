import { useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../layouts/admin/Layout";
import { useEffect } from "react";

function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken && !refreshToken) {
      // Save the attempted URL for redirecting after login
      navigate("/admin/login", { state: { from: location } });
    }
  }, [navigate, location]);

  return <AdminLayout />;
}

export default PrivateRoute;

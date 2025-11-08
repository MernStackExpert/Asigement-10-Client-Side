import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../Context/useAuthContext";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn loading">Loading...</button>
      </div>
    );
  }
  if (user && user.email) {
    return children;
  }

  return <Navigate to="/auth/login" state={location.pathname} />;
};

export default PrivetRoute;

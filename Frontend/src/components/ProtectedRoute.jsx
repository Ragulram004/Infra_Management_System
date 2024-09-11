import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuthContext();

  console.log('User:', user); // Add this to check the user object

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute

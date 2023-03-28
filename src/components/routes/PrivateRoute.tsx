import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'store/auth';

const PrivateRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

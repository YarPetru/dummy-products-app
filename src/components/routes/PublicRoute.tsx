import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'store/auth';

const PublicRoute: React.FC<{
  children: React.ReactNode;
  restricted?: boolean;
}> = ({ children, restricted = false }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return shouldRedirect ? (
    <Navigate to="/products" replace={true} />
  ) : (
    <>{children}</>
  );
};

export default PublicRoute;

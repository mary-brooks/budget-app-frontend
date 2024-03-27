import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // if the authentication is still loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    // if user is not logged in go to login page
    return <Navigate to={'/login'} />;
  } else {
    // if user is logged in, allow them to see the page
    return props.children;
  }
}

export default IsPrivate;

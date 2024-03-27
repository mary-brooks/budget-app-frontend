import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function IsAnon(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // if the authentication is still loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isLoggedIn) {
    return <Navigate to={'/'} />;
  } else {
    return props.children;
  }
}

export default IsAnon;

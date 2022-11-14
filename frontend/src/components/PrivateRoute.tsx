import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type Props = {
  children: JSX.Element;
};


const PrivateRoute = ({ children }: Props) => {
  // const userLogged = localStorage.getItem("access_token") ? true: false;
  const { loggedIn, setLoggedIn } = useAuth();
  
  return loggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

import { Navigate } from "react-router-dom";

import { getToken } from "../services/token";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const user = getToken("access_token");
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

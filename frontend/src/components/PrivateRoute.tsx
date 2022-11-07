import { Navigate } from "react-router-dom";

import  {useAuthVerify} from "../hooks/useAuthVerify";

type Props = {
  children: JSX.Element;
};


const PrivateRoute = ({ children }: Props) => {
  const user = useAuthVerify();
  console.log('user', user)
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

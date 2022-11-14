import { createContext, useContext } from "react";

export type AuthContextType = {
  loggedIn: boolean;
  setLoggedIn: (val:boolean) => void;
};

const contextDefaultValues: AuthContextType = {
  loggedIn: false,
  setLoggedIn: () => {}
};

export const AuthContext = createContext<AuthContextType>(contextDefaultValues);


export const useAuth = () => {
  return useContext(AuthContext);
};


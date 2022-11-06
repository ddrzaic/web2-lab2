import React from "react";
import { User } from "../helpers/types";

export interface UserProviderReturn {
  currentUser: User;
}
export const UserContext = React.createContext<UserProviderReturn>(
  {} as UserProviderReturn
);

export type UserProviderProps = {
  children: React.ReactNode;
  currentUser: User;
};

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  currentUser,
}) => {
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  return React.useContext(UserContext);
};

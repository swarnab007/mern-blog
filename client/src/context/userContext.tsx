import {createContext, useState} from "react";

export const UserContext = createContext({});

import { ReactNode } from "react";

export function UserContextProvider({children}: { children: ReactNode }) {
  const [userInfo,setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
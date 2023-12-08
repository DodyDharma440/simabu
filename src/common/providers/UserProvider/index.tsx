import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "@/common/components";
import { useGetProfile } from "@/auth/actions";

type UserCtx = {
  isLoggedIn: boolean;
};

const UserContext = createContext<UserCtx>({ isLoggedIn: false });

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { pathname } = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLoading, isRefetching, error } = useGetProfile(
    {},
    { enabled: isLoggedIn && pathname !== "/logout" }
  );

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn") || "false";
    setIsLoggedIn(isLogin === "true");
    setIsLoaded(true);
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <Loader
        isLoading={isLoading}
        isRefetching={isRefetching}
        error={error}
        placeholderHeight="100vh"
      >
        {isLoaded ? <>{children}</> : null}
      </Loader>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;

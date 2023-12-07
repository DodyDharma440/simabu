import React, { useEffect, useState } from "react";
import { Loader } from "@/common/components";
import { useGetProfile } from "@/auth/actions";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoading, isRefetching, error } = useGetProfile(
    {},
    { enabled: isLoggedIn }
  );

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn") || "false";
    setIsLoggedIn(isLogin === "true");
  }, []);

  return (
    <Loader
      isLoading={isLoading}
      isRefetching={isRefetching}
      error={error}
      placeholderHeight="100vh"
    >
      {children}
    </Loader>
  );
};

export default UserProvider;

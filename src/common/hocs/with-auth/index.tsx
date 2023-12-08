import { useUserProfile } from "@/auth/hooks";
import { Loader } from "@/common/components";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = <P extends Object = {}>(
  WrappedComponent: React.ComponentType<P>,
  role?: string | string[]
) => {
  const Component = (props: P) => {
    const { replace } = useRouter();
    const { userData } = useUserProfile();

    useEffect(() => {
      if (!userData) {
        replace("/");
      }
    }, [replace, userData]);

    if (!userData) {
      return (
        <Loader screenLoader isLoading={true}>
          <></>
        </Loader>
      );
    }

    if (role) {
      if (typeof role === "string") {
        if (userData.user?.role?.name !== role) {
          replace("/");

          return (
            <Loader screenLoader isLoading={true}>
              <></>
            </Loader>
          );
        }
      } else {
        if (!role.includes(userData.user?.role?.name || "")) {
          replace("/");

          return (
            <Loader screenLoader isLoading={true}>
              <></>
            </Loader>
          );
        }
      }
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

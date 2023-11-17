import React from "react";
import { AxiosError } from "axios";
import { Center, Loader as Loading, Text } from "@mantine/core";
import { getErrorMessage } from "@/common/utils/react-query";

export type LoaderProps = {
  children: React.ReactNode;
  isLoading: boolean;
  isRefetching?: boolean;
  error?: AxiosError<any, any> | null;
  placeholderHeight?: string;
  screenLoader?: boolean;
  loaderElement?: React.ReactNode;
  ignore?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  children,
  isLoading,
  isRefetching,
  error,
  placeholderHeight = "400px",
  screenLoader,
  loaderElement,
  ignore,
}) => {
  return (
    <>
      {ignore ? (
        <>{children}</>
      ) : (
        <>
          {isLoading || isRefetching ? (
            <>
              {loaderElement || (
                <Center sx={{ height: placeholderHeight }}>
                  <Loading />
                </Center>
              )}
            </>
          ) : error ? (
            <Center sx={{ height: placeholderHeight }}>
              <Text align="center">{getErrorMessage(error)}</Text>
            </Center>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  );
};

export default Loader;

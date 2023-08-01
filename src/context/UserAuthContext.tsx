import React from "react";
import { useService } from "../APIs/Services";
import { ILoginUser } from "../models";
import { useMutation, UseMutateAsyncFunction } from "react-query";

interface IUserAuthContext {
  mutateLoginUserApplication: UseMutateAsyncFunction<
    void,
    unknown,
    ILoginUser,
    unknown
  >;
  isLoginLoading: boolean;
}

export const UserAuthContext = React.createContext<IUserAuthContext>(null as any);

export const UserAuthProvider: React.FC<any> = ({ children }) => {
  const { userAuthService } = useService();

  const { mutateAsync: mutateLoginUserApplication, isLoading: isLoginLoading } =
    useMutation((requestBody: ILoginUser) =>
    userAuthService.loginUser(requestBody)
    );

  return (
    <UserAuthContext.Provider
      value={{ mutateLoginUserApplication, isLoginLoading }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

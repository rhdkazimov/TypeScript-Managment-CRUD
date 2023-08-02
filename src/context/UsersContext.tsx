import React from "react";
import { useService } from "../APIs/Services";
import { UseMutateAsyncFunction, useMutation, useQuery } from "react-query";
import { IEditUser, INewUser, IUserInfo } from "../models";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";

interface IUserContext {
    usersDataList : IUserInfo[];
    setEditUserId:React.Dispatch<React.SetStateAction<string | number >>;
    editUserId:string | number ;
    mutateEditUserApplication: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, IEditUser, unknown>
    setReloadPage:React.Dispatch<React.SetStateAction<boolean>>,
    reloadPage:boolean;
    mutateCreateUserApplication: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, INewUser, unknown>
}

export const UserContext = React.createContext<IUserContext>(null as any);


export const UserProvider: React.FC<any> = ({ children }) => {
  const { userService } = useService();
  const [reloadPage,setReloadPage] = React.useState(false)
  const { data:usersDataList } = useQuery([EQueryKeys.GetAllUsers],()=>{
    return userService.getAllUsers()
  })

  const [editUserId,setEditUserId] = React.useState<number|string>(0);

  const { mutateAsync: mutateEditUserApplication } =
    useMutation((requestBody: IEditUser) =>
    userService.uptadeUserById(editUserId,requestBody));

    const { mutateAsync: mutateCreateUserApplication } =
    useMutation((requestBody: INewUser) =>
    userService.createNewUser(requestBody));
 
  return (
    <UserContext.Provider
      value={{usersDataList:usersDataList?.data,setEditUserId,editUserId,mutateEditUserApplication,reloadPage,setReloadPage,mutateCreateUserApplication}}
    >
      {children}
    </UserContext.Provider>
  );
};

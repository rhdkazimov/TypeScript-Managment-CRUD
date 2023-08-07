import React from "react";
import { useService } from "../APIs/Services";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from "react-query";
import { IUserInfo } from "../models";
import { EQueryKeys } from "../enums";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/consts";

interface IUserContext {
    usersDataList : IUserInfo[];
    setEditUserId:React.Dispatch<React.SetStateAction<string | number >>;
    editUserId:string | number ;
    usersDataError:boolean;
    refetchGetAllUsers:<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<void | AxiosResponse<any, any>, unknown>>
}
export const UserContext = React.createContext<IUserContext>(null as any);
export const UserProvider: React.FC<any> = ({ children }) => {
  const { userService } = useService();
  const [usersDataError,setUsersDataError] = React.useState(false);
  const { data:usersDataList,refetch:refetchGetAllUsers} = useQuery([EQueryKeys.GetAllUsers],()=>userService.getAllUsers(),{onError:()=>setUsersDataError(true)})

  const [editUserId,setEditUserId] = React.useState<number|string>(0);

  return (
    <UserContext.Provider value={{usersDataList:usersDataList?.data,setEditUserId,editUserId,refetchGetAllUsers,usersDataError}}>
      {children}
    </UserContext.Provider>
  );
};

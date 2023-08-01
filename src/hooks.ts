import React from "react";
import { UserAuthContext } from "./context/UserAuthContext";
import {UserContext} from './context/UsersContext'
import { useService } from "./APIs/Services";

export const useUserAuthicantion = () => React.useContext(UserAuthContext)
export const useUser = () => React.useContext(UserContext);
// export const useUserLogout = () => {
//     const { userAuthService } = useService();
//    return userAuthService.logout();
// }
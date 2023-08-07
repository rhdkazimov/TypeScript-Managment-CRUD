import React from "react";
import { useUser } from "../../hooks";
import { Button } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { FadeLoader } from "react-spinners";
import { BasicTable } from "./Table";
import {  useQuery } from "react-query";
import { useService } from "../../APIs/Services";
import { EQueryKeys } from "../../enums";
import { convertToObject } from "typescript";

export const UserList: React.FC = () => {
  const { usersDataList,usersDataError} = useUser();
  const {userAuthService} = useService();
  const [isLogout,setIsLogout] = React.useState(false);
  const navigate = useNavigate();
  
  if(usersDataError){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(ROUTES.USER.LOGIN);
  }
  

  useQuery([EQueryKeys.User_LogOut],()=>userAuthService.logout(),{enabled:isLogout,onSuccess:()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogout(false);
    navigate(ROUTES.USER.LOGIN);
   }})

  const handleLogOut = () =>setIsLogout(true);
  const handleCreateNewUser = () =>navigate(ROUTES.USER.CREATE_USER)
  
  return (
    <div className="userlist">
      <div className="logout">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"/>
        <h1>All Users List</h1>
        <Button variant="contained" id="logout-btn" onClick={handleLogOut}>
          LogOut
        </Button>
      </div>
      <div className="datas">
        <div className="data-btn">
        <Button variant="contained" className="newUserBtn" onClick={handleCreateNewUser}>Add New User</Button>
        </div>
        {
        usersDataList ?
           <BasicTable users={usersDataList}/>:<FadeLoader className="loader" color="#36d7b7" />
        }
      </div>
    </div>
  );
};

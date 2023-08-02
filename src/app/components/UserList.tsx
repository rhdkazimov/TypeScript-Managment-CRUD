import React from "react";
import { useUser } from "../../hooks";
import { Button } from "@mui/material";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { BasicTable } from "./Table";

export const UserList: React.FC = () => {
  const { usersDataList,reloadPage,setReloadPage} = useUser();
  const navigate = useNavigate();
  const handleLogOut = () => {
    axios.get("http://localhost:3001").then(() => {
      localStorage.clear();
      navigate(ROUTES.USER.LOGIN);
    });
  };

  const handleCreateNewUser = () =>{
     navigate(ROUTES.USER.CREATE_USER)
  }
  
  if(reloadPage){
    window.location.reload()
    setReloadPage(false);
  }

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
        usersDataList &&
           <BasicTable users={usersDataList}/>
        }
      </div>
    </div>
  );
};

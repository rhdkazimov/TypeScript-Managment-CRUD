import React from 'react'
import { useUser } from '../../hooks'
import { useMutation, useQuery } from 'react-query';
import { EQueryKeys } from '../../enums';
import { useService } from '../../APIs/Services';
import { Box, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';
import { IEditUser } from '../../models';


const initialEditUserData = {
    firstName:"Test",
    lastName:"TSt",
    email:"mail",
}

export const UserEdit:React.FC = () => {
  const navigate = useNavigate();
  const {editUserId,refetchGetAllUsers,usersDataError} = useUser();
  const {userService} = useService();
  const [editUserData,setEditUserData] = React.useState(initialEditUserData);
  
  if(usersDataError){
    navigate(ROUTES.USER.LOGIN);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  useQuery(EQueryKeys.USER_EDIT,()=>userService.getUserById(editUserId).then((data)=>setEditUserData(data.data)))
  
  const { mutateAsync: mutateEditUserApplication } =
  useMutation((requestBody: IEditUser) =>
  userService.uptadeUserById(editUserId,requestBody));
  
  const handleEditInputChanges = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setEditUserData((previus) => ({ ...previus, [name]: value }));
    },[]
  );

  const handleSumbitEditDatas = () =>{
    mutateEditUserApplication(editUserData).then(()=>refetchGetAllUsers());
    navigate(ROUTES.USER.ALLDATAS)
  }

    return (
      <Box className="userEditBox">
        <h1>Edit Area</h1>
        <Input onChange={handleEditInputChanges} name='firstName' className='userEditInput' placeholder="Please Write Name"  value={editUserData.firstName} />
        <Input onChange={handleEditInputChanges} name="lastName" className='userEditInput' placeholder="Please Write SurName"  value={editUserData.lastName} />
        <Input onChange={handleEditInputChanges} name="email" className='userEditInput' placeholder="Please Write email"   value={editUserData.email} />
        <Button onClick={handleSumbitEditDatas} className='userEditBtn' type="submit">Edit</Button>
    </Box>
  )
}

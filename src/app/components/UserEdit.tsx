import React from 'react'
import { useUser } from '../../hooks'
import { useQuery } from 'react-query';
import { EQueryKeys } from '../../enums';
import { useService } from '../../APIs/Services';
import { Box, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';


const initialEditUserData = {
    firstName:"Test",
    lastName:"TSt",
    email:"mail",
}

export const UserEdit:React.FC = () => {
  const navigate = useNavigate();
  const {editUserId,setReloadPage,reloadPage} = useUser();
  const {userService} = useService();
  const [editUserOldData,setEditUserOldData] = React.useState(initialEditUserData);
  const [editUserNewData,setEditUserNewData] = React.useState(initialEditUserData);
  const {mutateEditUserApplication}= useUser();
  useQuery(EQueryKeys.USER_EDIT,()=>userService.getUserById(editUserId).then((data)=>setEditUserOldData(data.data.User)
  ))

  const handleEditInputChanges = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setEditUserNewData((previus) => ({ ...previus, [name]: value }));
        console.log(editUserNewData)
    },[editUserNewData]
  );

  const handleSumbitEditDatas = () =>{
    mutateEditUserApplication(editUserNewData);
    setReloadPage(!reloadPage)
    navigate(ROUTES.USER.ALLDATAS)
  }

  return (
    <Box className="userEditBox">
        <h1>Edit Area</h1>
        <Input onChange={handleEditInputChanges} name='firstName' className='userEditInput' placeholder="Please Write Name"  value={editUserOldData.firstName} />
        <Input onChange={handleEditInputChanges} name="lastName" className='userEditInput' placeholder="Please Write SurName"  value={editUserOldData.lastName} />
        <Input onChange={handleEditInputChanges} name="email" className='userEditInput' placeholder="Please Write email"   value={editUserOldData.email} />
        <Button onClick={handleSumbitEditDatas} className='userEditBtn' type="submit">Edit</Button>
    </Box>
  )
}

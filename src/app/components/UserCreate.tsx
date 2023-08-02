import React from 'react'
import { useUser } from '../../hooks'
import { useQuery } from 'react-query';
import { EQueryKeys } from '../../enums';
import { useService } from '../../APIs/Services';
import { Box, Button, Input, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/consts';


const initialNewUserData = {
    firstName:"Test",
    lastName:"TSt",
    email:"mail",
    roles:"Employer"
}

export const UserCreate:React.FC = () => {
  const navigate = useNavigate();
  const [newUserData,setnewUserData] = React.useState(initialNewUserData);
  const {mutateCreateUserApplication,setReloadPage,reloadPage}= useUser();


  const handleNewUserInputChanges = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setnewUserData((previus) => ({ ...previus, [name]: value }));
    },[newUserData]
  );

  const handleSumbitEditDatas = () =>{
    mutateCreateUserApplication(newUserData);
    navigate(ROUTES.USER.ALLDATAS);
    setReloadPage(!reloadPage);
  }

  return (
    <Box className="userCreateBox">
        <h1>Create Area</h1>
        <Input onChange={handleNewUserInputChanges} name='firstName' className='userCreateInput' placeholder="Please Write Name"   />
        <Input onChange={handleNewUserInputChanges} name="lastName" className='userCreateInput' placeholder="Please Write SurName" />
        <Input onChange={handleNewUserInputChanges} name="email" className='userCreateInput' placeholder="Please Write email" />
        <Button onClick={handleSumbitEditDatas} className='userCreateBtn' type="submit">Create</Button>
    </Box>
  )
}

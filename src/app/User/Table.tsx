import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUserInfo } from "../../models";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { useUser } from "../../hooks";
import { useQuery } from "react-query";
import { EQueryKeys } from "../../enums";
import { useService } from "../../APIs/Services";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

interface IProps {
  users: IUserInfo[];
}

export const BasicTable: React.FC<IProps> = ({ users }) => {
  const navigate = useNavigate();
  const { userService } = useService();
  const {setEditUserId,refetchGetAllUsers} = useUser();
  const [deleteUserCheck,setDeleteUserCheck] = React.useState(false)
  const [deleteUserId,setDeleteUserId] = React.useState<number|string>("");
  
  const handleUserEdit = (id:number|string) => {
        setEditUserId(id);
   navigate(ROUTES.USER.EDIT)
  };

  useQuery([EQueryKeys.USER_DELETE],()=>userService.deleteUserById(deleteUserId),{enabled:deleteUserCheck,onSuccess:()=>{refetchGetAllUsers();setDeleteUserCheck(false)}})

  const handleUserDelete = (id: number | string) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes,delete',
          onClick: () => {     setDeleteUserId(id);
            setDeleteUserCheck(true);}
        },
        {
          label: 'No',
        }
      ]
    });
  };
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">SurName</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.firstName}
              </TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.age}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.roles}</TableCell>
              <TableCell align="right">
                <Button onClick={()=> handleUserEdit(user._id)}>Edit</Button>
                <Button onClick={() => handleUserDelete(user._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

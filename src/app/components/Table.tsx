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
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { Login } from "../userAuth/Login";
import { log } from "console";
import { useUser } from "../../hooks";

interface IProps {
  users: IUserInfo[];
}

export const BasicTable: React.FC<IProps> = ({ users }) => {
  const navigate = useNavigate();
  const {setEditUserId} = useUser();
  const handleUserEdit = (id:number|string) => {
    setEditUserId(id);
   navigate(ROUTES.USER.EDIT)
  };
  const handleUserDelete = (id: number | string) => {
    axios.get(`http://localhost:3001/delete/${id}`);
    navigate(ROUTES.USER.LOGIN) //ps rerender apara bilmedim refresh yerine bele aldnrdm (isliyen koda deymezler)
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

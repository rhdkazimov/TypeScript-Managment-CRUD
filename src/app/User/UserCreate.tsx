import React from "react";
import { useUser } from "../../hooks";
import { useMutation } from "react-query";
import { useService } from "../../APIs/Services";
import { Box, Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { INewUser } from "../../models";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const initialNewUserData = {
  id: "null",
  firstName: "null",
  lastName: "null",
  email: "null",
  age: 0,
  password: "null",
  roles: "Employer",
};

export const UserCreate: React.FC = () => {
  const navigate = useNavigate();
  const [newUserData, setnewUserData] = React.useState(initialNewUserData);
  const { refetchGetAllUsers } = useUser();
  const { userService } = useService();
  const MySwal = withReactContent(Swal);

  const { mutateAsync: mutateCreateUserApplication } = useMutation(
    (requestBody: INewUser) => userService.createNewUser(requestBody)
  );

  const handleNewUserInputChanges =  React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setnewUserData((previus) => ({ ...previus, [name]: value }));
    },
    []
  );

  const handleSumbitEditDatas = () => {
    mutateCreateUserApplication(newUserData).then(() => {refetchGetAllUsers()
      MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(ROUTES.USER.ALLDATAS);
    }).catch(()=>{
      MySwal.fire({
        position: "top-end",
        icon: "warning",
        title: "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <Box className="userCreateBox">
      <h1>Create Area</h1>
      <Input
        onChange={handleNewUserInputChanges}
        name="firstName"
        className="userCreateInput"
        placeholder="Please Write FirstName"
      />
      <Input
        onChange={handleNewUserInputChanges}
        name="lastName"
        className="userCreateInput"
        placeholder="Please Write SurName"
      />
      <Input
        onChange={handleNewUserInputChanges}
        name="email"
        type="email"
        className="userCreateInput"
        placeholder="Please Write email"
      />
      <Input
        onChange={handleNewUserInputChanges}
        name="age"
        type="number"
        className="userCreateInput"
        placeholder="Please Write age"
      />
      <Input
        onChange={handleNewUserInputChanges}
        name="password"
        type="password"
        className="userCreateInput"
        placeholder="Please Write password"
      />
      <Button
        onClick={handleSumbitEditDatas}
        className="userCreateBtn"
        type="submit"
      >
        Create
      </Button>
    </Box>
  );
};

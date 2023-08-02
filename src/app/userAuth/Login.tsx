import React from "react";
import { useUserAuthicantion } from "../../hooks";
import { ILoginUser } from "../../models";
import { FadeLoader } from "react-spinners";
import SweetAlert2 from "react-sweetalert2";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const initialLoginValue = {
  email: "",
  password: "",
};

const initalSwalValue = {
  show: true,
  title: "Basic Usage",
  text: "Password or Email is wrong",
};

export const Login: React.FC = () => {
  const { mutateLoginUserApplication, isLoginLoading } = useUserAuthicantion();

  const [loginInputValue, setLoginInputValue] = React.useState<ILoginUser>(initialLoginValue);
  const [swalProps, setSwalProps] = React.useState(initalSwalValue);
  const [isLogin, setIsLogin] = React.useState(false);
  const navigate = useNavigate();
  const handleLoginInputChanges = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInputValue((previus) => ({ ...previus, [name]: value }));
    },
    []
  );

  const handleLoginFormSumbit = React.useCallback(() => {
    mutateLoginUserApplication(loginInputValue).then(()=>navigate(ROUTES.USER.ALLDATAS)).catch((err) => {
      setSwalProps({
        show: true,
        title: "Danger",
        text: "Email or Password Wrong",
      });
      setIsLogin(true);
    });
  }, [loginInputValue, mutateLoginUserApplication,navigate]);

  if (isLogin) {
    setTimeout(() => {
      setIsLogin(false);
    }, 1000);
    return <SweetAlert2 {...swalProps} />;
  }
  
  return isLoginLoading ? (
    <FadeLoader color="#36d7b7" />
  ) : (
    <div className="login-area">
      <h1>Welcome To Login Page</h1>
      <div className="login-inputs">
        <TextField
          onChange={handleLoginInputChanges}
          type="email"
          placeholder="Please Enter Email Adress"
          name="email"
        />
        <TextField
          onChange={handleLoginInputChanges}
          type="password"
          placeholder="Please Enter Password"
          name="password"
        />
      </div>
      <Button variant="contained" onClick={handleLoginFormSumbit}>
        Login{" "}
      </Button>
    </div>
  );
};

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./consts";
import { UserAuthProvider } from "../context/UserAuthContext";
import { Login } from "../app/userAuth/Login";
import { UserProvider } from "../context/UsersContext";
import { UserList } from "../app/User/UserList";
import { NotFound } from "../app/components/NotFound";
import { ProtectedRouter } from "../app/components/ProtectedRouter";
import { ProtectedLoginRouter } from "../app/components/ProtectedLoginRouter";
import { UserEdit } from "../app/User/UserEdit";
import { UserCreate } from "../app/User/UserCreate";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.USER.LOGIN}
        element={
          <ProtectedLoginRouter>
            <UserAuthProvider>
              <Login />
            </UserAuthProvider>
          </ProtectedLoginRouter>
        }
      />
      <Route
        path={ROUTES.USER.ALLDATAS}
        element={
          <ProtectedRouter>
            <UserProvider>
              <UserList />
            </UserProvider>
          </ProtectedRouter>
        }
      />
            <Route
        path={ROUTES.USER.EDIT}
        element={
          <ProtectedRouter>
            <UserProvider>
              <UserEdit />
            </UserProvider>
          </ProtectedRouter>
        }
      />
        <Route
        path={ROUTES.USER.CREATE_USER}
        element={
          <ProtectedRouter>
            <UserProvider>
              <UserCreate />
            </UserProvider>
          </ProtectedRouter>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

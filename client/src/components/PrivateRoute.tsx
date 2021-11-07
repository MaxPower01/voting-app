import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthenticationState } from "../modules/authentication/authenticationSlice";

interface Props {
  element: React.ReactElement;
  path?: string;
  //   roles: Array<ROLE>;
}

const PrivateElement: React.FC<Props> = ({ element /*, roles*/ }) => {
  //   const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectAuthenticationState);
  //   const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (isAuthenticated /*&& userHasRequiredRole*/) return element;

  //   if (isAuthenticated && !userHasRequiredRole)
  //     return <AccessDenied />;

  return <Navigate to="/" />;
};

export const PrivateRoute: React.FC<Props> = ({
  element,
  /*roles,*/ ...rest
}) => {
  return (
    <Route
      {...rest}
      element={<PrivateElement element={element} /*roles={roles}*/ />}
    />
  );
};

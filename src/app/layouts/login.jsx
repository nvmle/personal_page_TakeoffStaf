import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn, logOut } from "../store/users";
import LoginForm from "../ui/loginForm";

const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUserData = useSelector(getCurrentUserData());
  const handleLogOut = () => {
    dispatch(logOut());
  };

  if (!isLoggedIn) return <LoginForm />;
  return (
    <>
      <h2>{currentUserData[0].name}</h2>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
};

export default Login;

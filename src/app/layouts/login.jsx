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

  return (
    <div className="constainer mt-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 shadow p-4">
          {!isLoggedIn ? (
            <>
              <LoginForm />
              <p className="mt-4">
                Demo login-password:
                <br />
                q1@q.com password1
                <br />
                q2@q.com password2
                <br />
                q3@q.com password3
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-4">Hello, {currentUserData[0].name}</h2>
              <button className="btn btn-secondary" onClick={handleLogOut}>
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // if (!isLoggedIn) return <LoginForm />;
  // return (
  //   <>
  //     <h2>{currentUserData[0].name}</h2>
  //     <button onClick={handleLogOut}>Log Out</button>
  //   </>
  // );
};

export default Login;

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";

const ProtectedRoute = ({ component: Component }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <Route
      render={(props) => {
        if (isLoggedIn) return <Component {...props} />;
        else return <Redirect to="/login" />;
      }}
    />
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.func,
};

export default ProtectedRoute;

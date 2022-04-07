import { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadContactList } from "../../store/contacts";
import {
  getCurrentUser,
  getIsLoading,
  getIsLoggedIn,
  loadUsersList,
} from "../../store/users";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isLoading = useSelector(getIsLoading());
  const currentUserId = useSelector(getCurrentUser())?.userId;

  useEffect(() => {
    dispatch(loadUsersList());

    if (isLoggedIn) {
      dispatch(loadContactList(currentUserId));
    }
  }, [isLoggedIn]);

  if (isLoading) return "Loading";
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;

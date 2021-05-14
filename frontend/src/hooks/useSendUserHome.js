import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toastrWarning } from "../functions/toastrs";
import { publicRoutes } from "../router";

const useSendUserHome = (matchUrl) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!publicRoutes.includes(matchUrl.path) && !isAuthenticated) {
      //console.log(matchUrl);
      history.push("/");
      toastrWarning("Authentication Error", "You need to login to view that");
    }
  }, []);
};

export default useSendUserHome;

/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ProgressBar } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        (
        <ProgressBar
          height="80"
          width="80"
          color="#000"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        )
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRoute;

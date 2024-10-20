import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuthContextHook = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuthContextHook;

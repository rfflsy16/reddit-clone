import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function isSignOut() {
    const authContext = useContext(LoginContext)

    return !authContext.isLogin
}
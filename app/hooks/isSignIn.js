import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function isSignIn() {
    const authContext = useContext(LoginContext)

    return authContext.isLogin
}
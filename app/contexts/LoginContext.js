import { createContext, useState } from "react";

export const LoginContext = createContext()

// export const LoginProvider = ({ children }) => {
//     const [isLogin, setIslogin] = useState(false)

//     return (
//         <LoginProvider.Provider value={{ isLogin, setIslogin }}>
//             {children}
//         </LoginProvider.Provider>
//     )
// }
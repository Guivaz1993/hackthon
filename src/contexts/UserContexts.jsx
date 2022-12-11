/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import { createContext } from "react";
import useUserProvider from "../hooks/useUserProvider";

const UserContext = createContext({});

export function UserProvider(props) {
    const userProvider = useUserProvider();

    return (
        <UserContext.Provider value={userProvider}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;

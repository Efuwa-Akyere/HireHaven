import { createContext, useState } from "react";
import { api } from "../config/axios.js";


export const EmployerAuthContext = createContext(null);

export function AuthProvider({
    children
}) {
    const [employer, setEmployer] = useState(null);

    const [loading, setLoading] = useState(true);


    async function employerLogin(username, password) {
        try {
            const res = await api.post('/auth/elogin', {
                username,
                password,
            });

            if(res.data.success) {
                setEmployer(res.data.user);
                setLoading(false);
                return res.data;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <EmployerAuthContext.Provider value={{employer, setEmployer, employerLogin}}>
            {children}
        </EmployerAuthContext.Provider>
    )

}
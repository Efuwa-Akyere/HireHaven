import { createContext, useState } from "react";
import { api } from "../config/axios.js";


export const EmployerAuthContext = createContext(null);

export function EmployerAuthProvider({
    children
}) {
    const [employer, setEmployer] = useState(null);

    const [loading, setLoading] = useState(true);


    async function employerLogin(email, password) {
        try {
            const res = await api.post('/auth/elogin', {
                email,
                password,
            });

            if(res.data.success) {
                setEmployer(res.data.employer);
                setLoading(false);
                return res.data;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <EmployerAuthContext.Provider value={{employer, setEmployer, loading, employerLogin}}>
            {children}
        </EmployerAuthContext.Provider>
    )

}
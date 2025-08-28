import { createContext, useState } from "react";
import { api } from "../config/axios.js";


export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({
    children
}) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    async function adminLogin(username, password) {
        try {
            const res = await api.post('/auth/alogin',{
                username,
                password,
            });

            if(res.data.success) {
                setAdmin(res.data.admin);
                setLoading(false);
                return res.data;
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <AdminAuthContext.Provider value={{admin, setAdmin, loading, adminLogin}}>
            {children}
        </AdminAuthContext.Provider>
    )
}
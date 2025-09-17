import { createContext, useState } from "react";
import { api } from "../config/axios.js";
import { useNavigate } from "react-router-dom";


export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({
    children
}) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    

    async function adminLogin(email, password) {
        try {
            const res = await api.post('/auth/alogin',{
                email,
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

    async function adminLogout() {
        
        
        try {
            const res = await api.post('auth/alogout');
            
            if(res.data.success) {
                setAdmin(null);
                 window.location.href = "/";
                return res.data;
            }
        } catch (error) {
            console.log('logout failed', error);
        }
    }

    return (
        <AdminAuthContext.Provider value={{admin, setAdmin, loading, adminLogin, adminLogout}}>
            {children}
        </AdminAuthContext.Provider>
    )
}
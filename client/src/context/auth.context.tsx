import axios from "axios";
import Cookies from 'js-cookie';
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    auth: boolean;
    setAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    auth: false,
    setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(auth) {
            navigate('/dashboard')
        }
        else if (!auth && Cookies.get('jwt')){
            axios.get('/api/profile')
            .then(res => {
                if(res.status === 200) {
                    setAuth(true)
                }
            })
        }
        else {
            navigate('/login')
        }
    } , [auth])

    const value: AuthContextType = {
        auth,
        setAuth: (value) => setAuth(value)
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

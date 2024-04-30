import { ReactNode, createContext, useState } from "react";

interface AuthContextType {
    auth: boolean;
    setAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    auth: false,
    setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<boolean>(true);

    const value: AuthContextType = {
        auth,
        setAuth: (value) => setAuth(value)
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

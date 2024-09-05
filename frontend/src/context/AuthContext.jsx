import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem('userInfo'));
            setIsAuthenticated(true);
            setUser(storedUser);
            console.log(user);
            console.log(isAuthenticated);
        }
        setLoading(false);
    }, []);

    const signOut = async () => {
        try {
            const response = await axios.put(`/api/users/signOut/${user._id}`);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userInfo');
            setIsAuthenticated(false);
            setUser(null);
            return { success: true };
        } catch (err) {
            console.log('Logout error: ' + err);
            return { success: false, message: err.response?.data?.msg || 'Logout failed' };
        }
    };

    return (
        <AuthContext.Provider value={{ setIsAuthenticated, isAuthenticated, setUser, user, signOut }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

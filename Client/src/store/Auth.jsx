import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true); // Corrected here
    const [services, setServices] = useState([]); // Initialize as an empty array
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;
    console.log("token", token);
    console.log("isLoggedin ", isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            setIsLoading(true); // Corrected here
            const response = await fetch("http://localhost:5002/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("user Data",data.userData)
                setUser(data.userData);
               setIsLoading(false); // Corrected here
            } else {
                console.error("Error fetching user data");
                setIsLoading(false); // Corrected here
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false); // Corrected here
        }
    };

    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5002/api/data/service", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            } else {
                console.error("Error fetching services");
            }
        } catch (error) {
            console.log(`Service frontend Error: ${error}`);
        }
    };

    useEffect(() => {
        userAuthentication();
        getServices();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken ,isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const AppContext = createContext();


export const AppProvider = ({ children }) => {


    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false)
    const [showHotelReg, setShowHotelReg] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])

const fetchUser = async () => {
    try {
        // 🔥 Step 1: token lo
        const token = await getToken();

        console.log("TOKEN:", token); // debug

        // 🔥 Step 2: agar token nahi hai to stop
        if (!token) {
            console.log("No token found");
            return;
        }

        // 🔥 Step 3: API call
        const { data } = await axios.get('/api/user');
        // 🔥 Step 4: response handle
        if (data.success) {
            setIsOwner(data.role === "hotelOwner");
            setSearchedCities(data.recentSearchedCities);
        }

    } catch (error) {
        console.log("FETCH USER ERROR:", error);
    }
};

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user])

    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
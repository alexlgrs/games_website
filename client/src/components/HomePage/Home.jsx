import './Home.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserNavbar from '../UserNavbar/UserNavbar';
import logoAmiko from '../../assets/logo/navbar_logo_amiko.png';

function Home() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    useEffect(() => { 
        if (!token) navigate("/auth"); 
    }, [token, navigate]);
    

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/auth");
    }
    return (
        <div className="min-h-screen bg-[#FDFBF7] relative">
            <div className="w-full px-[2vw] pt-[2vh] flex justify-center items-start">
                <img src={logoAmiko} className="w-[10vw] h-auto" alt="logo" />
                <div className="absolute right-[2vw] top-[2vh]">
                    <UserNavbar user={storedUser} />
                </div>
            </div>

            
        </div>
    );
}

/*
<div className="flex flex-col items-center justify-center mt-[20vh] gap-6">
                <h1 className="text-[#5D4037] text-4xl font-bold">Bonjour {storedUser?.displayName}</h1>
                <button onClick={handleLogout} className="bg-[#7B824B] hover:bg-[#5D4037] text-white px-8 py-2 rounded-full transition-colors font-bold shadow-md">
                    Déconnexion
                </button>
            </div>

*/
export default Home;
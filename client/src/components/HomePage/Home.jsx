import './Home.css';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import UserMenu from '../UserMenu/UserMenu';
import Wordle from '../Games/Wordle/Wordle';

function Home() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [wordleOpen, setWordleOpen] = React.useState(false);
    
    useEffect(() => { 
        if (!token) navigate("/auth"); 
    }, [token, navigate]);
    
    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/auth");
    }

    function handleWordleClick(e){
        e.currentTarget.blur();
        setWordleOpen(!wordleOpen);
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative">
            <div className="w-full px-[2vw] pt-[2vh] flex justify-center items-start">
                <img src='../../assets/logo/navbar_logo_amiko.png' className="w-[10vw] h-auto" alt="logo" />
                <div className="absolute right-[2vw] top-[2vh]">
                    <UserMenu user={storedUser} onLogout={handleLogout} />
                </div>
            </div>

            <div className="absolute left-[2vw] top-[12vh] w-[200px] h-[75vh] bg-[#E6D5B8] rounded-[40px] p-5 flex flex-col gap-4 shadow-sm">
                <button 
                    onClick={handleWordleClick} 
                    className="w-full py-3 bg-[#D9C5A3] text-[#5D4037] rounded-2xl font-bold text-sm hover:bg-[#CCB896] transition-colors shadow-sm focus:outline-none"
                >
                    WORDLE
                </button>
                <button className="w-full py-3 bg-[#D9C5A3] text-[#5D4037] rounded-2xl font-bold text-sm hover:bg-[#CCB896] transition-colors shadow-sm">
                    Quêtes
                </button>
            </div>

            {wordleOpen && (
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Wordle />
                </div>
            )}
        </div>
    );
}

export default Home;
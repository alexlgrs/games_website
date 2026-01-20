import './Home.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

function Home() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const navigate = useNavigate()    
    
    useEffect(() => {
        if (!token) {
            console.log("direction /auth");
            navigate("/auth");
        }
    }, [token, navigate]);
    

    
    async function handleLogout(e){
        e.preventDefault()

        if(token) {
            localStorage.removeItem("token")
            navigate("/auth")
        }
    }

    return (
    <div className="Home">
        bonjour { storedUser.displayName}

        <button onClick={handleLogout}>Disconnect</button>     
    </div>
    );
}

export default Home;

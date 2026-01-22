import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/home");
        } else {
            console.log(data.message);
        }
    }

    return (
        <div className="bg-[#E6D5B8] p-10 rounded-[40px] w-[350px] shadow-sm flex flex-col items-center">
            <h2 className="text-[#5D4037] text-3xl font-bold mb-10">Connexion</h2>

            <form className="flex flex-col gap-5 w-full" onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Nom d'utilisateur" 
                    autoComplete='off'
                    className="w-full p-4 rounded-2xl bg-white text-[#5D4037] placeholder-[#A68A78] outline-none focus:ring-2 focus:ring-[#7B824B]"
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                />

                <input 
                    type="password" 
                    placeholder="Mot de passe" 
                    autoComplete='off'
                    className="w-full p-4 rounded-2xl bg-white text-[#5D4037] placeholder-[#A68A78] outline-none focus:ring-2 focus:ring-[#7B824B]"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />

                <button type="submit" className="mt-6 self-center w-fit px-10 py-2 bg-[#7B824B] hover:bg-[#6A703F] text-white font-bold rounded-2xl transition-all duration-200 shadow-md">
                    Se connecter
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <p className="text-[#8C6A5E] font-medium">Pas encore de compte ?</p>
                <button onClick={() => navigate("/register")}className="text-[#7B824B] font-bold hover:underline">
                    S'inscrire
                </button>
            </div>
        </div>
    );
}

export default Login;
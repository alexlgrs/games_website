import React, { useState, useEffect } from 'react';

const Wordle = () => {
    const [guesses, setGuesses] = useState(Array(6).fill(""));
    const [results, setResults] = useState(Array(6).fill(null));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [isLost, setIsLost] = useState(false);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const lastPlayedDate = localStorage.getItem("wordleLastPlayedDate");

        if (lastPlayedDate !== today) {
            localStorage.removeItem("wordleGuesses");
            localStorage.removeItem("wordleResults");
            localStorage.removeItem("wordleStatus");
            localStorage.setItem("wordleLastPlayedDate", today);
        } else {
            const savedGuesses = JSON.parse(localStorage.getItem("wordleGuesses"));
            const savedResults = JSON.parse(localStorage.getItem("wordleResults"));
            const savedStatus = localStorage.getItem("wordleStatus");

            if (savedGuesses) setGuesses(savedGuesses);
            if (savedResults) {
                setResults(savedResults);
                const nextRow = savedResults.findIndex(res => res == null);
                setCurrentRow(nextRow == -1 ? 6 : nextRow);
            }
            if (savedStatus == "won") setIsWon(true);
            if (savedStatus == "lost") setIsLost(true);
        }
    }, []);

    useEffect(() => {
        if (currentRow > 0 || isWon || isLost) {
            localStorage.setItem("wordleGuesses", JSON.stringify(guesses));
            localStorage.setItem("wordleResults", JSON.stringify(results));
            if (isWon) localStorage.setItem("wordleStatus", "won");
            if (isLost) localStorage.setItem("wordleStatus", "lost");
        }
    }, [guesses, results, isWon, isLost, currentRow]);

    const submitGuess = async () => {
        if (currentGuess.length !== 5) return;
        try {
            const response = await fetch("/api/games/wordle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ word: currentGuess })
            });
            const data = await response.json();
            const hasWon = data.result.every(score => score == 2);
            const newGuesses = [...guesses];
            const newResults = [...results];
            newGuesses[currentRow] = currentGuess;
            newResults[currentRow] = data.result;
            setGuesses(newGuesses);
            setResults(newResults);
            if (hasWon) setIsWon(true);
            else if (currentRow == 5) setIsLost(true);
            else { setCurrentRow(prev => prev + 1); setCurrentGuess(""); }
        } catch (error) { console.error("Erreur :", error); }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isWon || isLost) return;
            if (e.key == "Enter") submitGuess();
            if (e.key == "Backspace") setCurrentGuess(prev => prev.slice(0, -1));
            if (/^[a-z]$/i.test(e.key) && currentGuess.length < 5) setCurrentGuess(prev => prev + e.key.toLowerCase());
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentGuess, isWon, isLost, currentRow]);

    const getStyle = (row, col, letter) => {
        if (!results[row]) return letter ? 'border-[#5D4037] bg-white text-[#5D4037]' : 'border-[#E6D5B8] bg-[#E6D5B8]/20';
        const score = results[row][col];
        if (score == 2) return 'bg-[#7B824B] border-[#7B824B] text-white';
        if (score == 1) return 'bg-[#D9C5A3] border-[#D9C5A3] text-white';
        return 'bg-[#5D4037] border-[#5D4037] text-white/40';
    };

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-[#FDFBF7] rounded-[32px] shadow-sm border border-[#E6D5B8] w-fit">
            <div className="flex gap-1">
                {["W","O","R","D","L","E"].map((l, i) => (
                    <div key={i} className="w-8 h-8 flex items-center justify-center bg-[#5D4037] text-[#FDFBF7] rounded-lg font-bold text-sm shadow-sm">
                        {l}
                    </div>
                ))}
            </div>

            <div className="grid grid-rows-6 gap-2">
                {guesses.map((_, i) => (
                    <div key={i} className="grid grid-cols-5 gap-2">
                        {Array(5).fill(0).map((_, j) => {
                            const letter = i == currentRow ? currentGuess[j] : guesses[i][j];
                            return (
                                <div key={j} className={`w-11 h-11 flex items-center justify-center text-xl font-bold uppercase rounded-xl border-2 transition-all duration-500 ${getStyle(i, j, letter)}`}>
                                    {letter}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {isWon && <p className="text-[#7B824B] font-bold text-lg animate-bounce text-center leading-tight">Gagné ! 🏆<br/><span className="text-[10px] font-normal">Reviens demain !</span></p>}
            {isLost && <p className="text-[#B3523E] font-bold text-lg text-center leading-tight">Perdu 🥺<br/><span className="text-[10px] font-normal">Reviens demain !</span></p>}
        </div>
    );
};

export default Wordle;
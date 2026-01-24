import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/wordle.json");

interface WordleData {
    words: string[];
    today_index: number;
    last_refresh: number;
}

export const verifyWord = async (req: Request, res: Response) => {
    const { word } = req.body;
    const guess = word.toLowerCase();

    const raw = fs.readFileSync(filePath, "utf-8");
    const data: WordleData = JSON.parse(raw);

    if (Date.now() - data.last_refresh > 86400000) {
        data.today_index = Math.floor(Math.random() * data.words.length);
        data.last_refresh = Date.now();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }

    const secret = data.words[data.today_index].toLowerCase();
    var result = new Array(5).fill(0);
    var secretLetters = secret.split("");

    var guessLetters = guess.split("");

    guessLetters.forEach((letter: string, index: number) => {
        var found: boolean = false;

        secretLetters.forEach((secretLetter: string, secretIndex: number) => {
            if(secretLetter == letter){
                if(index == secretIndex) { // bon bien placé
                    result[index] = 2
                } else { // bon mal placé
                    result[index] = 1
                }
                found = true
            }
        })

        if(!found) {// pas de le mot
            result[index] = 0
        }
    });

    return res.json({ 
        result: result
    });
};
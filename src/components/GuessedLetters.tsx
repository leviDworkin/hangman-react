import { useState } from "react";
import {getCharIndexes } from "../globals/GameGlobals";
import LettersDisplay from './LettersDisplay';
interface GuessedWordProp{
    correctWord:string;
    currLetter:string;
    failedAttemptHandler:()=>void;
    isWinner:()=>void;
    reset:boolean;
}
const GuessedLetters = ({correctWord,currLetter,failedAttemptHandler: failedAttempt, isWinner , reset}:GuessedWordProp) => {
    const [savedIndexes, setSavedIndexs] = useState<string[]>([]);
    let [currentLetterIndexes] = useState<number[]>([]);
    const [lettersGuessed, setLettersGuessed] = useState<Record<string,boolean>>({});
    const [missesArr,setMissesArr] = useState<string[]>([]);
    
    const resetGame = () => {
        setSavedIndexs([]);
        setLettersGuessed({});
        setMissesArr([]);
        currentLetterIndexes = [];
    }

    if(reset){
        resetGame();
    }

    const checkIfWinner = () => {
        const correctArr = savedIndexes.filter((index, letterIndex) => letterIndex != null);
        if(correctArr.length == correctWord.length){
            isWinner();
        }
    }
    
    if(lettersGuessed[currLetter] == true || lettersGuessed[currLetter] == false){
        //TODO- some ui indication for this
        console.log("Already guessed that letter",currLetter);
    }else if(currLetter != undefined && !reset){
        
        const aIndex = correctWord?.indexOf(currLetter);
        lettersGuessed[currLetter] = aIndex != -1;

        const indexesArr = getCharIndexes(correctWord as string,currLetter);
        currentLetterIndexes = indexesArr;
        
        if(indexesArr.length == 0){
            missesArr.push(currLetter);
            failedAttempt();
        }

        window.setTimeout(()=>checkIfWinner(),1);
    }
    
    const letters = correctWord.split('');

    const getValue = (index:number,letters:string[]):string => {
        if(reset){
            return "_";    
        }
        let res = currentLetterIndexes.includes(index) ? letters[index] : "_"
        if(res != "_"){
            savedIndexes[index] = res;
        }else if(savedIndexes[index] != null){
            res = savedIndexes[index];
        }
        return res;
    }

    const getMisses = () => {
        if(reset){
            return [];
        }
        const aArr = [];
        for(const aLetter in lettersGuessed){
            if(lettersGuessed[aLetter] === false){
                aArr.push(aLetter);
            }
        }
        return aArr;
    }

    return(
        <div>
            <div className='word'>
                <span>Misses:</span>
                {missesArr.length > 0 && <LettersDisplay letters={getMisses()}/>}
            </div>
            
            <div className='word'>
                <span>Words:</span>
                <LettersDisplay letters={letters.map((char,index) => getValue(index,letters))}/>
            </div>
        </div>
    );
}

export default GuessedLetters;
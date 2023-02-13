import React, { useState } from 'react';
import GameSelection from './GameSelection';
import CorrectLetters from './CorrectLetters';
import { GameTypes, getCharIndexes, validateLetter } from '../globals/GameGlobals';
import InputLetter from './InputLetter';
import Gallows from './Gallows';
import Guesses from './Guesses';

const Game = () => {
    const [gameType, setGameType]= useState<string>();
    const [lettersGuessed, setLettersGuessed] = useState<Record<string,boolean>>({});
    const [currentLetterIndexes, setcurrentLetterIndexes] = useState<number[]>([]);
    const [failedAttempt, setFailedAttempt]= useState<number>(0);
    const [guessesNum, setGuessesNum] = useState<number>();

    const selectedWord:string | undefined = gameType && GameTypes[gameType];
    
    const handleGameSelect = (selectedGame:string)=>{
        setGameType(selectedGame);
    }

    const handleInputLetter = (inputLetter:string|undefined)=>{
        console.log(inputLetter)
        const aIsValidLetter = validateLetter(inputLetter);
        if(aIsValidLetter){
            const aLetter = inputLetter as string;
            if(lettersGuessed[aLetter] == true || lettersGuessed[aLetter] == false){
                //TODO
                console.log("Already guess that letter");
            }else{
                const aIndex = selectedWord?.indexOf(aLetter);
                setLettersGuessed({aLetter:aIndex != -1});
                const indexesArr = getCharIndexes(selectedWord as string,aLetter);
                setcurrentLetterIndexes(indexesArr);
                if(indexesArr.length == 0){
                    setFailedAttempt(failedAttempt + 1);
                }
            }
        }else{
            //TODO
            console.log("Invalid input");
        }
        
        const aGuessNumber = guessesNum != null ? guessesNum + 1 : 1; 
        setGuessesNum(guessesNum);
    }

    return(<div className='game'>
    <div> 
        <span className='app-header'>Hangman</span>
        <GameSelection onSelect={handleGameSelect}/>
        <button className="reset-btn" >Reset Game</button>
        <div>
            {selectedWord && <InputLetter onInput={handleInputLetter}/>}
            {guessesNum != null && <Guesses guessNum={guessesNum}/>}
            {selectedWord && <CorrectLetters correctWord={selectedWord} currentLetterIndexes={currentLetterIndexes}/>}
            <Gallows attempt={failedAttempt}/>
        </div>
    </div>
    
</div>)
}

export default Game;
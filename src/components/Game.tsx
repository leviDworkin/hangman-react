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
    const [guessesNum, setGuessesNum] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);

    let selectedWord:string | undefined = gameType && GameTypes[gameType];

    const resetGame = () => {
        setGameOver(false);

        const aType = gameType as string;

        setGameType(undefined);
        selectedWord = undefined;
        setLettersGuessed({});
        setcurrentLetterIndexes([]);
        setFailedAttempt(0);
        setGuessesNum(0);

        window.setTimeout(()=>handleGameSelect(aType),1);
    }
    
    const handleGameSelect = (selectedGame:string)=>{
        setGameType(selectedGame);
    }

    const handleInputLetter = (inputLetter:string|undefined)=>{
        if(gameOver){
            return;
        }

        console.log(inputLetter)
        const aIsValidLetter = validateLetter(inputLetter);
        if(aIsValidLetter){
            const aLetter = inputLetter?.toUpperCase() as string;
            if(lettersGuessed[aLetter] == true || lettersGuessed[aLetter] == false){
                //TODO- some ui indication for this
                console.log("Already guessed that letter");
            }else{
                const aIndex = selectedWord?.indexOf(aLetter);
                lettersGuessed[aLetter] = aIndex != -1;
                const indexesArr = getCharIndexes(selectedWord as string,aLetter);
                setcurrentLetterIndexes(indexesArr);
                if(indexesArr.length == 0){
                    setFailedAttempt(failedAttempt + 1);
                    if(failedAttempt + 1 == 6){
                        isLost();
                        return;
                    }
                }
                
                const aGuessNumber = guessesNum != null ? guessesNum + 1 : 1; 
                setGuessesNum(aGuessNumber);
            }
        }else{
            //TODO- some ui indication for this
            console.log("Invalid input");
        }
    }

    const isWinner = ()=>{
        console.log("You Won!");
        setGameOver(true);
    }

    const isLost = ()=>{
        console.log("You Lost!");
        setGameOver(true);
    }

    return(
    <div>
        <div className='app-header'>
            <span>Hangman</span>
            <GameSelection onSelect={handleGameSelect}/>
            <button className="short-btn" onClick={resetGame}>Reset Game</button>
        </div>
        
        <div className='app-body'> 
            {selectedWord && <Gallows attempt={failedAttempt}/>}
            <div className="guess-words">
                {selectedWord && <InputLetter onInput={handleInputLetter}/>}
                <div>
                    {selectedWord && <Guesses guessNum={guessesNum}/>}
                    {selectedWord && <CorrectLetters correctWord={selectedWord} currentLetterIndexes={currentLetterIndexes} isWinner={isWinner}/>}
                </div>
            </div>
        </div>
    
    </div>
    )
}

export default Game;
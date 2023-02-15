import { useState } from 'react';
import GameSelection from './GameSelection';
import GuessedLetters from './GuessedLetters';
import { GameTypes, validateLetter } from '../globals/GameGlobals';
import InputLetter from './InputLetter';
import Gallows from './Gallows';

const Game = () => {
    const [gameType, setGameType]= useState<string>();
    const [failedAttempt, setFailedAttempt]= useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [currLetter, setCurrLetter] = useState<string>();
    const [reset, setReset] = useState<boolean>(false);
    const [selectedWord, setSelectedWord] = useState<string>();

    const resetGame = () => {
        setReset(true);
        setGameOver(false);
        const aType = gameType as string;

        setGameType(undefined);
        setSelectedWord(undefined);
        setFailedAttempt(0);
        setCurrLetter(undefined);
        document.title = "Hangman";

        window.setTimeout(()=>{
            handleGameSelect(aType);
            setReset(false);
        },1);
    }
    
    const handleGameSelect = (selectedGame:string)=>{
        if(selectedWord != undefined){
            return;
        }
    
        setGameType(selectedGame);
        setSelectedWord(GameTypes[selectedGame]);
    }

    const handleInputLetter = (inputLetter:string|undefined)=>{
        if(gameOver){
            return;
        }

        const aIsValidLetter = validateLetter(inputLetter);
        if(aIsValidLetter){
            const aLetter = inputLetter?.toUpperCase() as string;
            setCurrLetter(aLetter);

        }else{
            //TODO- some ui indication for this
            console.log("Invalid input");
        }
    }

    const failedLetter = ()=>{
        setFailedAttempt(failedAttempt + 1);
        if(failedAttempt + 1 == 6){
            isLost();
        }
    }

    const isWinner = ()=>{
        setGameOver(true);
        alert("You won the game");
        document.title = "You won the game";
    }

    const isLost = ()=>{
        setGameOver(true);
        alert("You lost the game!");
        document.title = "You lost the game";
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
                    {selectedWord && <GuessedLetters correctWord={selectedWord} currLetter={currLetter as string} failedAttemptHandler={failedLetter} isWinner={isWinner} reset={reset}/>}
                </div>
            </div>
        </div>
    
    </div>
    )
}

export default Game;
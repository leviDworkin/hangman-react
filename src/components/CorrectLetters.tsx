import { useState } from "react";
import Letter from "./Letter";

interface CorrectWordProp{
    correctWord:string
    currentLetterIndexes:Array<number>;
    isWinner:()=>void;
}
const CorrectLetters = ({correctWord, currentLetterIndexes, isWinner}:CorrectWordProp) => {
    const [savedIndexes, setSavedIndexs] = useState<string[]>(new Array(correctWord.length));

    const letters = correctWord.split('');
    
    
    const checkIfWinner = () => {
        const correctArr = savedIndexes.filter((index, letterIndex) => letterIndex != null);
        if(correctArr.length == correctWord.length){
            isWinner();
        }
    }

    const getValue = (index:number,letters:string[], currentLetterIndexes:number[]):string => {
        let res = currentLetterIndexes.includes(index) ? letters[index] : "_"
        if(res != "_"){
            savedIndexes[index] = res;
        }else if(savedIndexes[index] != null){
            res = savedIndexes[index];
        }
        return res;
    }

    checkIfWinner();

    return(
        <div className='word'>
            <span>Words:</span>
            {letters.map((char,index) => <Letter value={getValue(index,letters, currentLetterIndexes)}/>)}
        </div>
    );
}

export default CorrectLetters;
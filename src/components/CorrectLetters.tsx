import { useState } from "react";
import Letter from "./Letter";

interface CorrectWordProp{
    correctWord:string
    currentLetterIndexes:Array<number>;
}
const CorrectLetters = ({correctWord, currentLetterIndexes}:CorrectWordProp) => {
    const [savedIndexes, setSavedIndexs] = useState<string[]>(new Array(correctWord.length));

    const letters = correctWord.split('');
    // const correctLetters = currentLetterIndexes.map( index => {letter, display: true} : {letter,})
    
    const getValue = (index:number,letters:string[], currentLetterIndexes:number[]):string => {
        let res = currentLetterIndexes.includes(index) ? letters[index] : "_"
        if(res != "_"){
            savedIndexes[index] = res;
        }else if(savedIndexes[index] != null){
            res = savedIndexes[index];
        }
        return res;
    }

    return(
        <div className='word'>
            <span>Words:</span>
            {letters.map((char,index) => <Letter value={getValue(index,letters, currentLetterIndexes)}/>)}
        </div>
    );
}

export default CorrectLetters;
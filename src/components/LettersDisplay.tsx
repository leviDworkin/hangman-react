import Letter from "./Letter";

interface LettersProp{
    letters:string[];
}

const LettersDisplay = ({letters}:LettersProp) => {
    return(
        <div className="letters-row">
            {letters.length > 0 && letters.map(char => <Letter value={char}/>)}
        </div>
    );
}

export default LettersDisplay;
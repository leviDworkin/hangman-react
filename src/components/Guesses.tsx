interface GuessesNum{
    guessNum:number;
}
const Guesses = ({guessNum}:GuessesNum)=>{
    return(
        <span>Guesses:{guessNum}</span>
    );
}

export default Guesses;
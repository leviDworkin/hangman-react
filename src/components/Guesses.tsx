interface GuessesNum{
    guessNum:number;
}
const Guesses = ({guessNum}:GuessesNum)=>{
    return(
        <span className="guesses">Guesses:{guessNum}</span>
    );
}

export default Guesses;
interface LetterProp{
    value:string
}
const Letter = ({value}:LetterProp)=>{
    return(
        <div>
            {<span>{value}</span>}
        </div>
    );
}

export default Letter;
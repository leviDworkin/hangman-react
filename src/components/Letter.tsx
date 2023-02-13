interface LetterProp{
    value:string
}
const Letter = ({value}:LetterProp)=>{
    return(
        <div className="letter"> 
        
            {<span>{value}&nbsp;</span>}
        </div>
    );
}

export default Letter;
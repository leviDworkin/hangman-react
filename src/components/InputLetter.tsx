import { useState } from "react";

interface InputLetterProp{
    onInput:(value:string|undefined)=>void;
}

const InputLetter = ({onInput}:InputLetterProp) => {
    const [inputValue, setInput] = useState<string>();


    return(
        <div className="guess-input">
            <input className="input-elem" onChange={(e)=>setInput(e.target.value)} type="text" min={1} max={1} placeholder="Enter letter guess"></input>
            <button className="short-btn" onClick={()=>onInput(inputValue)}>Submit</button>
        </div>
    );
}

export default InputLetter;
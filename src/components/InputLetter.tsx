import { useState } from "react";

interface InputLetterProp{
    onInput:(value:string|undefined)=>void;
}

const InputLetter = ({onInput}:InputLetterProp) => {
    let inputValue:string;

    const onEnterKey = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key == "Enter" || e.key == " "){
            onInput(e.currentTarget.value);
            e.currentTarget.value = "";
        }
    }

    return(
        <div className="guess-input">
            <input className="input-elem" onKeyUp={(e)=>onEnterKey(e)} onChange={(e)=>(inputValue = e.target.value)} type="text" min={1} max={1} placeholder="Enter letter guess"></input>
            <button className="short-btn" onClick={(e)=>onInput(inputValue)}>Submit</button>
        </div>
    );
}

export default InputLetter;
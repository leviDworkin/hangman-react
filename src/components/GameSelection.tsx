import React from "react";
interface GameSelectionProps{
    onSelect:(value:string)=>void
}
const GameSelection = ({onSelect}:GameSelectionProps)=>{
    return (
    <select className='game-selection' onChange={(e)=>onSelect(e.target.value)}>
        <option disabled selected hidden>Click to choose a game...</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
    </select>
    );
}

export default GameSelection;
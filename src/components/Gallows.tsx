import { useState , GetDerivedStateFromError} from 'react';
import logo0 from '../assets/imgs/Hangman-0.png';
import logo1 from '../assets/imgs/Hangman-1.png';
import logo2 from '../assets/imgs/Hangman-2.png';
import logo3 from '../assets/imgs/Hangman-3.png';
import logo4 from '../assets/imgs/Hangman-4.png';
import logo5 from '../assets/imgs/Hangman-5.png';
import logo6 from '../assets/imgs/Hangman-6.png';

interface FailedGuessNumProp{
    attempt:number
}

const Gallows = ({attempt}:FailedGuessNumProp)=>{
    const imgsArr = [logo0,logo1,logo2,logo3,logo4,logo5,logo6];

    return(
        <div className="hangman-img">
            <img src={imgsArr[attempt]} alt=''/>
        </div>
    );
}

export default Gallows;
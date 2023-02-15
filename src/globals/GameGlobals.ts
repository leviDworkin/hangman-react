
// export class Globals{
//     public static finalAnswer:string|undefined;
// };

export const GameTypes:Record<string,string> = {
    "1":"STAIRS",
    "2":"KABOOM",
    "3":"FALAFEL"
}

export const validateLetter = (inputValue:string|undefined):boolean=>{
    if(inputValue == null || inputValue.length > 1){
        return false;
    }
    const aUpperCaseValue = inputValue.toUpperCase();
    if(aUpperCaseValue >= 'A' && aUpperCaseValue <= 'Z'){
        return true;
    }
    return false;
}

export const getCharIndexes = (word:string, char:string):Array<number> => {
    const indexes = [];
    for (let i = 0; i <= word.length; i++) {
      if (word[i] === char) {
        indexes.push(i);
      }
    }
    return indexes;
  }

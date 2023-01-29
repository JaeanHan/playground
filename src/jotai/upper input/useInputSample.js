import {useAtom} from "jotai";
import {derivedLogAtom} from "./atoms/inputAtoms";
import {useState} from "react";
import {writeInputAtom} from "./actions/inputActions";

export const useInputSample = () => {
    const [enteredInput, setEnteredInput] = useState("");
    const [uppercaseAtomValue, writeAtom] = useAtom(writeInputAtom);
    // const [uppercaseAtomValue] = useAtom(upperInputAtom);
    const [, updateLog] = useAtom(derivedLogAtom);
    const regExp = /[^a-zA-Z0-9]/g;

    const updateInputAtom = (event) => {
        const textValue = event.target.value;

        if(event.key === "Enter") {
            updateLog();
            setEnteredInput("");
            console.log(enteredInput);
            return;
        }

        setEnteredInput(textValue);

        if(!regExp.test(textValue)) {
            writeAtom(textValue);
        } else {
            alert("no special character allowed!");
        }



        // if(event.key === "Enter" && !regExp.test(textValue)) {
        //     writeAtom(textValue);
        // } else if(regExp.test(textValue)) {
        //     // setEnteredInput(textValue.replace)
        // }

    }

    return {enteredInput, uppercaseAtomValue, updateInputAtom};
}
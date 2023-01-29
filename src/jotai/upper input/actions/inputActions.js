import {atom} from "jotai";
import {inputAtom} from "../atoms/inputAtoms";

export const writeInputAtom = atom(
    get => get(inputAtom).toUpperCase(),
    (get, set, newText) => {
    console.log("input atom dated!");
    set(inputAtom, newText);
})
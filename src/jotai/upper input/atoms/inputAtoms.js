import {atom} from "jotai";

export const inputAtom = atom("");
// export const upperInputAtom = atom(get => get(inputAtom).toUpperCase());


const logAtom = atom([]);
export const derivedLogAtom = atom(
    (get) => get(logAtom).map(log => {
        if(!log.text.includes("\n")) {
            log.text += "\n";
        }
        return log;
    }),
    (get, set) => {
        const curr = get(logAtom);
        set(logAtom, [...curr, {id: curr.length + 1 , text: get(inputAtom)}]);
        console.log(get(logAtom));
    });


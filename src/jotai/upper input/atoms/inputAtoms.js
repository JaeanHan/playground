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

export const atomFamilyMapAtom = atom({});

export const setAtomFamilyMapAtom = atom(get => get(atomFamilyMapAtom), (get, set, newIndex) => {
    console.log("setAtomFamilyMapAtom newIndex", newIndex);

    const current = get(atomFamilyMapAtom);

    const index = newIndex >= 5 ? 'banana' : 'melon';

    if(!(index in current))
        current[index] = atom(newIndex);

    set(current[index], newIndex);

    console.log(`current[${index}]`, get(current[index]));

    console.log(get(get(atomFamilyMapAtom)[index]));
    return get(get(atomFamilyMapAtom)[index]);
});

const getTestAtom = atom('found me!');

const getTestTestAtom = atom(get => get(getTestAtom));

export const getTestTestTestAtom = atom(get => {
    return get(getTestTestAtom);
})
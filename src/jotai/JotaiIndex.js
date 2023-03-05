import {Fragment, useState} from "react";
import {useInputSample} from "./upper input/useInputSample";
import {useAtom, useAtomValue} from "jotai";
import {derivedLogAtom, getTestTestTestAtom, setAtomFamilyMapAtom} from "./upper input/atoms/inputAtoms";

const JotaiIndex = () => {
    const {input, uppercaseAtomValue, updateInputAtom} = useInputSample();
    const [openModal, setOpenModal] = useState(false);
    const [logAtomValue] = useAtom(derivedLogAtom);
    const [aF, setAF] = useAtom(setAtomFamilyMapAtom);
    const test = useAtomValue(getTestTestTestAtom);

    return <Fragment>
        <div>{uppercaseAtomValue}</div>
        <input value={input} placeholder={'enter text'} onKeyUp={event => updateInputAtom(event)}/>
        <br/>
        <button onClick={event => setOpenModal(!openModal)} >show history</button>
        {openModal && logAtomValue.map(log => <div key={log.id}>{log.text}</div>)}
        <button onClick={() => console.log(setAF(Math.floor(Math.random() * 10)))}>atom family test</button>
        <div>
            {
                Object.keys(aF).map((name) => (<Fruit name={name} priceAtom={aF[name]} key={name} />))
            }
        </div>
        <button onClick={() => console.log(test)}>getTestTestTest</button>

    </Fragment>;
}

const Fruit = ({name, priceAtom}) => {
    const [price] = useAtom(priceAtom);
    return (
        <div>{name} : {price}</div>
    )
}

export default JotaiIndex;
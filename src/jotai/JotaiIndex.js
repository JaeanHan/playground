import {Fragment, useState} from "react";
import {useInputSample} from "./upper input/useInputSample";
import {useAtom} from "jotai";
import {derivedLogAtom} from "./upper input/atoms/inputAtoms";

const JotaiIndex = () => {
    const {input, uppercaseAtomValue, updateInputAtom} = useInputSample();
    const [openModal, setOpenModal] = useState(false);
    const [logAtomValue] = useAtom(derivedLogAtom);

    return <Fragment>
        <div>{uppercaseAtomValue}</div>
        <input value={input} placeholder={"press enter to send!"} onKeyUp={event => updateInputAtom(event)}/>
        <br/>
        <button onClick={event => setOpenModal(!openModal)} >show history</button>
        {openModal && logAtomValue.map(log => <div key={log.id}>{log.text}</div>)}
    </Fragment>;
}

export default JotaiIndex;
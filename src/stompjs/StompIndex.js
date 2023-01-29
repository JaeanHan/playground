import {Fragment} from "react";
import {Client} from "@stomp/stompjs";
import {atom, useAtom} from "jotai";

// websocket은 시작 하자마자 connection + subscribe 세팅해서 pub까지 하는거고
// stompjs는 버튼으로 connection + subscribe 그리고 publish까지

// websocket

const ws = new WebSocket("ws://localhost:8080/ws");

let isConnected = false;
ws.addEventListener("CONNECTED", () => {isConnected = true; console.log('connected');});

ws.onopen = () => {
    const cMsg = `CONNECT
login:user
passcode:none
accept-version:1.0,1.1,1.2
heart-beat:4000,4000

\x00`;
    ws.send(cMsg);

    const sMsg = `SUBSCRIBE
id:sub-testId
destination:/sub/channel

\x00`;
    if(isConnected) {
        ws.send(sMsg);
    } else {
        setTimeout(() => ws.send(sMsg), 2000);
    }
};

ws.onmessage = (event) => {
    console.log('message arrived')
    console.log(event.data);
};

// states

const subscribedMessage = atom([]);
const getSubscribedMessage = atom(
    get => get(subscribedMessage),
    (get, set, newMessage) => {
        set(subscribedMessage, [...get(subscribedMessage) , newMessage]);
        console.log(get(subscribedMessage));
    });

const publishMessage = atom("");

// stomp

const publishTest = async (client) => {

    if(client.active) {
        const res = await client.publish({
            destination: '/pub/hello',
            body: JSON.stringify({ type: 'message', sender: 'stomp', channelId: 'hihi', data: 'testData' })
        });
        console.log('pTest', res);
    }

}

const StompIndex = () => {
    const [messages, updateMessage] = useAtom(getSubscribedMessage);
    const [pubMessage, setPubMessage] = useAtom(publishMessage);

    // stompjs
    
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
            login: 'user',
            passcode: 'password',
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });

    client.onConnect = function (frame) {
        console.log('connected')
        client.subscribe('/sub/channel', (message) => {
            console.log('this is from pub', message);
            const payload = JSON.parse(message.body);
            updateMessage(payload.data);
        });
    };

    client.onDisconnect(frame => {
        client.deactivate().then(() => {console.log('deactivate client due to disconnect')})
    })

    // stompjs, server, websock 서로 sub pub은 잘됨

    return <Fragment>
        <div>
            [ /pub/hello -> /sub/channel ] broadcasting hello to channel
            <br/>
            [ /pub/jae -> /sub/channel ] same broadcasting but different pub
        </div>
        <br/>
        <div>stomp listening to /sub/channel pub to /pub/hello</div>
        <button onClick={() => client.activate()}>activate</button>
        <button onClick={() => client.deactivate()}>deactivate</button>
        <button onClick={() => publishTest(client)}>publish</button>
        <br/>
        {/*{messages.map(r => <div key={r.data}>{r.data}</div>)}*/}
        <div>raw websocket listening to /sub/channel pub to /pub/jae</div>
        <form onSubmit={(e) => {
            e.preventDefault();
            const sData = { type: 'message', sender: 'ws', channelId: 'hihi', data: pubMessage };
            const strData = JSON.stringify(sData);
            const pMsg = `SEND
destination:/pub/jae
content-length:${strData.length}

${strData}\x00`;
            ws.send(pMsg);

        } }>
            <input type="text" value={pubMessage} onChange={e => setPubMessage(e.target.value)}/>
            <button type>ws publish</button>
        </form>
            {/*websocket -> stomp 테스트하고 싶을때 끄면됨 콘솔 정리용*/}
            <button type="button" onClick={(e) => {
            const usMsg = `SUBSCRIBE
id:sub-testId
destination:/sub/channel

\x00`
                ws.send(usMsg);
            }
            }>ws unsubscribe</button>
    </Fragment>;
}

export default StompIndex;
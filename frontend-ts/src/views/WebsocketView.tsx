import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function WebSocketView() {
  // const [websocket, setWebsocket] = useState({
  //   filledForm: false,
  //   messages: [],
  //   values: "",
  //   name: "",
  //   room: "test"
  // });
  const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:8000/ws/test");
  const [messageHistory, setMessageHistory] = useState([]);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage("Hello from the client!"), []);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];
  return (
    <>
      <div className='grid grid-cols-2 gap-10'>
        <Button >
                    Click Me to change Socket Url
        </Button>
        <Button
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
                    Click Me to send 'Hello'
        </Button>
      </div>
      <div className='text-lg pt-10 font-light text-center'>The WebSocket is currently:  
        <Badge className='ml-4 align-middle'>{connectionStatus}</Badge>
      </div>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul className='grid grid-cols-1'>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>

    </>
  );
}
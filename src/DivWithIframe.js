import React, { useEffect, useRef, useState } from "react";
import IframeResizer from "iframe-resizer-react";

//import MessageData from './message-data'

export default function DivWithIframe(props) {
  const iframeRef = useRef(null);
  const [messageData, setMessageData] = useState();

  const onResized = (data) => setMessageData(data);

  const onMessage = (data) => {
    setMessageData(data);

    iframeRef.current.sendMessage("Hello back from the parent page");
  };

  useEffect(() => {
    props.onHeightUpdate(props.index, messageData?.height || 0);
  }, [messageData]);

  return (
    <>
      <div className="pt-3">
        <span className="bgpurple p-2 pt-1 text-white d-inline-block">
          {props.width}
        </span>
        <span className="bgcyan p-2 pt-1 text-white d-inline-block">
          {messageData?.height}
        </span>
      </div>
      <IframeResizer
        forwardRef={iframeRef}
        heightCalculationMethod="lowestElement"
        inPageLinks
        //log
        checkOrigin={false}
        onMessage={onMessage}
        onResized={onResized}
        //src="//sp.imweb.ru/implant/sp/ufalike2020/templates/default/iframe/"
        src={props.src}
        style={{
          width: props.width + "px",
          maxWidth: props.width + "px"
        }}
      />
      {/*<MessageData data={messageData} />*/}
    </>
  );
}

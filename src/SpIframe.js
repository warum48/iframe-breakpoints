import React, { useEffect, useRef, useState } from "react";
import Html from "./Html";

export default function SpIframe(props) {
  useEffect(() => {}, []);

  return (
    <>
      <div className="pt-3">
        <span className="bgpink p-2 pt-1 text-white d-inline-block">
          COSMO TEST INSERTION
        </span>
        <span className="bgpurple p-2 pt-1 text-white d-inline-block">
          dynamic width
        </span>
        <span className="bgcyan p-2 pt-1 text-white d-inline-block">
          dynamic height
        </span>
      </div>
      <Html>{props.iframe}</Html>
    </>
  );
}

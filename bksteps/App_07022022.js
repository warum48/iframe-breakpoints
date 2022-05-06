import "./styles.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext
} from "react-bootstrap";
import React, { useState, useEffect, useRef, useContext } from "react";
import IframeResizer from "iframe-resizer-react";
import DivWithIframe from "./DivWithIframe";
import PrismCode from "react-prism";
import "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/themes/prism-okaidia.css";
//import "https://dev.nahab.info/all/implants.js"
import Helmet from "react-helmet";

export default function App() {
  const [breakpoints] = useState([
    //{ name: "Bootstrap v5", points: [576, 768, 992, 1200, 1400] },
    //{ name: "Tailwind v2", points: [640, 768, 1024, 1280, 1536] }
    { name: "bootstrap", points: [576, 768, 992, 1200, 1400] },
    { name: "tailwind", points: [640, 768, 1024, 1280, 1536] }
  ]);
  //const [bpshema, setBPSchema] = useState("bootstrap");
  const outputTF_pre = useRef(null);
  const outputTF_pre_res = useRef(null);
  const outputTF = useRef(null);
  const [bpshema, setBPSchema] = useState(breakpoints[0].name);
  const [bpoints, setBPoints] = useState(breakpoints[0].points);
  const [renderNum, setRenderNum] = useState(0);
  const [iframeURL, setIframeURL] = useState(
    //"//sp.imweb.ru/implant/sp/ufalike2020/templates/default/iframe/"
    ""
  );
  //const [outputCode, setOutputCode] = useState("<style></style>");
  const [heightArray, setHeightArray] = useState([]);
  useEffect(() => {
    console.log("bpshema", bpshema);
    setHeightArray([]);
    setBPoints(breakpoints.find((x) => x.name === bpshema).points);
    setRenderNum((renderNum) => renderNum + 100);
  }, [bpshema, iframeURL]);
  useEffect(() => {
    console.log("impjssrc", window.implants);

    let aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src = "https://dev.nahab.info/all/implants.js";

    document.head.appendChild(aScript);

    aScript.onload = function () {
      console.log("wi", window.implants);
      setIframeURL(
        "//sp.imweb.ru/implant/sp/" +
          window.implants[2].name +
          "/templates/default/iframe/"
      );
    };
  }, []);
  function updateHeightArray(index, height) {
    console.log(index, height);
    const updatedArray = [...heightArray];
    updatedArray[index] = height;
    setHeightArray(updatedArray);
    console.log("har updated");
  }
  function copyCodeToClipboardPre() {
    navigator.clipboard.writeText(outputTF_pre.current.textContent);
  }
  function copyCodeToClipboard() {
    navigator.clipboard.writeText(outputTF.current.textContent);
  }

  function ContextAwareToggle({ children, eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => callback && callback(eventKey)
    );
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <button
        type="button"
        //style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
        className={isCurrentEventKey ? "footnote_open" : ""}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="App">
      {/*<Helmet>
        <script
          src="https://dev.nahab.info/all/implants.js"
          type="text/javascript"
        />
      </Helmet>*/}
      <Container fluid>
        <Row className="align-items-baseline mb-4 bgpurpletocyan text-white ">
          {/*<Col className="mt-3 ms-0" xs="auto">
            <h1>IFRAME HEIGHT</h1>
          </Col>
          <Col className="mt-3 " xs="auto">
            <h6>for different breakpoints</h6>
  </Col>*/}
          <Col>
            <span className="fs-1">IFRAME HEIGHT</span>
            <span className="fs-6">for different breakpoints</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <div className="taskname m-1 fw-bold">Input iframe url:</div>
            <div className="form-floating">
              <input
                type="url"
                className="form-control"
                id="floatingPassword"
                placeholder="iframe"
                value={iframeURL}
                onChange={(e) => setIframeURL(e.currentTarget.value)}
              />
              <label htmlFor="floatingPassword">iframe url</label>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="taskname m-1 fw-bold">Breakpoints set:</div>
            <div className="form-floating">
              <Form.Select
                aria-label="Default select example"
                id="selectBPShema"
                className="form-control"
                value={bpshema}
                onChange={(e) => setBPSchema(e.currentTarget.value)}
              >
                {breakpoints.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <label htmlFor="selectBPShema">breakpoints</label>
            </div>
          </Col>
          <Col xs={12} md={3} className="">
            <div className="taskname m-1">Breakpoints:</div>
            <div className="">
              {bpoints.map((item, index) => (
                <span
                  key={index}
                  className="bgpurple p-2 pt-1 pb-1 text-white me-1 mb-1 d-inline-block fs-6"
                >
                  {item}
                </span>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="m-2 ms-1 mb-1 mt-3">
            Calculated heights:
            {heightArray.map((item, index) => (
              <span
                key={index}
                className="bgcyan p-2 pt-1 pb-1 text-white ms-1 mb-1 d-inline-block fs-6"
              >
                {item}
              </span>
            ))}
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="vw-100 ms-1 textpurple">
              <code className="textpurple">Resizer Script Enabled:</code>
            </div>
          </Col>

          <Col className="">
            {heightArray.length != 0 && !heightArray.includes(undefined) ? (
              <div className="outputcode p-4 pt-3 pb-3 position-relative">
                <div className="position-absolute end-0 top-0 m-2 "></div>
                <pre>
                  <PrismCode
                    className="language-html wordwrap"
                    ref={outputTF_pre_res}
                  >
                    {/*`<iframe src=${iframeURL} class="spIframe" id="spIframe" style="max-width: ${
                      bpoints[0] - 1
                    }px; height:${
                      heightArray[0]
                    }px; border: 0px; overflow: hidden; ></iframe>\n`*/}

                    {`<iframe src=${iframeURL} scrolling="no" style="width: 100%; height: ${
                      heightArray[heightArray.length - 1]
                    }px; border: 0px; overflow: hidden;" id="spIframe" class="spIframe"></iframe>\n<script src="https://sp.imweb.ru/implant/sp/assets/resizer/resizer.js"></script>`}
                  </PrismCode>
                </pre>
              </div>
            ) : (
              <span className="bgcyan p-2 pt-1 pb-1 text-white mb-1 d-inline-block fs-6">
                loading...
              </span>
            )}
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="ms-1 textpurple">
                    <code className="textpurple">Predefined styles:</code>
                  </div>
                  <span></span>
                </Accordion.Header>
                <Accordion.Body>
                  {heightArray.length != 0 &&
                  !heightArray.includes(undefined) ? (
                    <div className="outputcode p-4 pt-3 pb-3 position-relative">
                      <div className="position-absolute end-0 top-0 m-2 ">
                        {/* DISABLED TODO FIX <Button
                    variant="outline-light"
                    size="sm"
                    onClick={copyCodeToClipboardPre}
                  >
                    Copy
                  </Button>*/}
                      </div>
                      <pre>
                        {/*<code >*/}
                        <PrismCode className="language-html" ref={outputTF_pre}>
                          {`<style>\n`}

                          {heightArray.map((item, index) => (
                            <React.Fragment
                              key={index}
                            >{`.screen-bp${index}-only { display: none }\n`}</React.Fragment>
                          ))}

                          {bpoints.map((item, index) => (
                            <React.Fragment key={index}>
                              {index === 0
                                ? `@media (max-width: ${
                                    bpoints[index] - 1
                                  }px) { .screen-bp${index}-only {display: block;}}\n`
                                : `@media (min-width: ${
                                    bpoints[index - 1]
                                  }px) and (max-width: ${
                                    bpoints[index] - 1
                                  }px) {.screen-bp${index}-only {display: block;}}\n`}
                            </React.Fragment>
                          ))}
                          {`@media (min-width: ${
                            bpoints[bpoints.length - 1]
                          }px) {.screen-bp${
                            bpoints.length
                          }-only {display: block;}}\n`}
                          {`</style>\n`}

                          {heightArray.map((item, index) => (
                            <React.Fragment key={index}>
                              {index === 0
                                ? `<iframe src=${iframeURL} class="screen-bp${index}-only" style="max-width: ${
                                    bpoints[index] - 1
                                  }px; height:${
                                    heightArray[index]
                                  }px; overflow: hidden;" scrolling="no"></iframe>\n`
                                : `<iframe src=${iframeURL} class="screen-bp${index}-only" style="min-width: ${
                                    bpoints[index - 1]
                                  }px; ${
                                    bpoints[index]
                                      ? "max-width: " +
                                        (bpoints[index] - 1) +
                                        "px;"
                                      : ""
                                  } height:${
                                    heightArray[index]
                                  }px; overflow: hidden;" scrolling="no"></iframe>\n`}
                            </React.Fragment>
                          ))}
                        </PrismCode>
                        {/*</code>*/}
                      </pre>
                    </div>
                  ) : (
                    <span className="bgcyan p-2 pt-1 pb-1 text-white mb-1 d-inline-block fs-6">
                      loading...
                    </span>
                  )}
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="ms-1 textpurple">
                    <code className="textpurple">
                      Tag {`<style/>`} enabled:
                    </code>
                  </div>
                  <span></span>
                </Accordion.Header>
                <Accordion.Body>
                  {heightArray.length != 0 &&
                  !heightArray.includes(undefined) ? (
                    <div className="outputcode p-4 pt-3 pb-3 position-relative">
                      <div className="position-absolute end-0 top-0 m-2 ">
                        <Button
                          variant="outline-light"
                          size="sm"
                          onClick={copyCodeToClipboard}
                        >
                          Copy
                        </Button>
                      </div>
                      <pre>
                        <code ref={outputTF}>
                          {`<style>\n`}
                          {/*{heightArray.map((item, index) => (
                      <React.Fragment
                        key={index}
                      >{`.screen-bp${index}-only { display: none }\n`}</React.Fragment>
                    ))}*/}

                          {bpoints.map((item, index) => (
                            <React.Fragment key={index}>
                              {index === 0
                                ? `@media (max-width: ${
                                    bpoints[index] - 1
                                  }px) {.spImplant{display: block; height:${
                                    heightArray[index]
                                  }px;}}\n`
                                : `@media (min-width: ${
                                    bpoints[index - 1]
                                  }px) and (max-width: ${
                                    bpoints[index] - 1
                                  }px) {.spImplant{display: block; height:${
                                    heightArray[index]
                                  }px; min-width: ${
                                    bpoints[index - 1]
                                  }px; max-width: ${
                                    bpoints[index] - 1
                                  }px; }}\n`}
                            </React.Fragment>
                          ))}
                          {`@media (min-width: ${
                            bpoints[bpoints.length - 1]
                          }px) {.spImplant {display: block; height:${
                            heightArray[heightArray.length - 1]
                          }px; min-width: ${
                            bpoints[bpoints.length - 1]
                          }px;}}\n`}
                          {`</style>\n`}

                          {/*{heightArray.map((item, index) => (
                      <React.Fragment key={index}>
                        {index === 0
                          ? `<iframe src="//sp.imweb.ru/implant/sp/ufalike2020/templates/default/iframe/" class="screen-bp${index}-only" style="max-width: ${
                              bpoints[index] - 1
                            }px; height:${
                              heightArray[index]
                            }px; overflow: hidden;" scrolling="no"></iframe>\n`
                          : `<iframe src="//sp.imweb.ru/implant/sp/ufalike2020/templates/default/iframe/" class="screen-bp${index}-only" style="min-width: ${
                              bpoints[index - 1]
                            }px; ${
                              bpoints[index]
                                ? "max-width: " + (bpoints[index] - 1) + "px;"
                                : ""
                            } height:${
                              heightArray[index]
                            }px; overflow: hidden;" scrolling="no"></iframe>\n`}
                      </React.Fragment>
                          ))}*/}
                          {`<iframe src=${iframeURL} class="spImplant" style="overflow: hidden;" scrolling="no" ></iframe>`}
                        </code>
                      </pre>
                    </div>
                  ) : (
                    <span className="bgcyan p-2 pt-1 pb-1 text-white mb-1 d-inline-block fs-6">
                      loading...
                    </span>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <Row>
          <Col xs="auto" className="overflow-scroll">
            <DivWithIframe
              width={bpoints[0] - 101}
              index={0}
              onHeightUpdate={updateHeightArray}
              src={iframeURL}
              key={renderNum}
            />
          </Col>
          {bpoints.map((item, index) => (
            <Col
              xs="auto"
              key={renderNum + 1 + index}
              className="overflow-scroll"
            >
              <DivWithIframe
                width={item}
                index={index + 1}
                onHeightUpdate={updateHeightArray}
                src={iframeURL}
                key={renderNum + 1 + index}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

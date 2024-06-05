import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { fetchPostDetails } from "../api";
import "../css/tarot-layout.css";

interface Props {
  doneStateUpright: Array<boolean>;
  doneStateReverse: Array<boolean>;
  doneStateLastCard: boolean;
  toggleDoneStateUpright: Function;
  toggleDoneStateReverse: Function;
  toggleDoneStateLastCard: Function;
  binaryState: string;
  setBinaryState: Function;
  sideCount: number;
}

const InputSection = (props: Props) => {
  const [urlText, setUrlText] = useState("");

  const [resp, setResp] = useState("");

  function onClickGetData() {
    // urlText.split(/\n/g).forEach((url) => fetchPostDetails(url).then((response) => console.log(response)));
    urlText.split(/\n,;/g).forEach((url) => console.log(url));
  }

  return (
    <section id="input-section">
      <div>
        <label htmlFor="binary">Binary:</label>
        <input id="binary" type="text" value={props.binaryState} onChange={(e) => props.setBinaryState(e.target.value)} />
      </div>
      {/* <hr />
      <div>
        <textarea rows={15} cols={60} value={urlText} onChange={(e) => setUrlText(e.target.value)} />
        <input type="submit" value="Get Data" onClick={onClickGetData} />
      </div> */}
      {/* <div>{resp}</div> */}
      <hr />
      <form id="checkbox-input" className="tarot-layout">
        <div className="tarot-container no-gap-auto-rows">
          {props.doneStateUpright.map((state, i) => (
            <label key={`chk_u_${i}`} className="upright">
              <input name="uprightChecks" type="checkbox" checked={state} value={i} onChange={(e) => props.toggleDoneStateUpright(i)} />
              {(i % props.sideCount).toString().padStart(2, "0") + "U"}
            </label>
          ))}
        </div>
        <div className="last-checkbox-container">
          <label>
            <input name="lastCheck" type="checkbox" checked={props.doneStateLastCard} value={props.sideCount} onChange={() => props.toggleDoneStateLastCard()} />
            {props.sideCount}
          </label>
        </div>
        <div className="tarot-container no-gap-auto-rows">
          {props.doneStateReverse.map((state, i) => (
            <label key={`chk_r_${i}`} className="reverse">
              <input name="reverseChecks" type="checkbox" checked={state} value={i} onChange={(e) => props.toggleDoneStateReverse(i)} />
              {(i % props.sideCount).toString().padStart(2, "0") + "R"}
            </label>
          ))}
        </div>
      </form>
    </section>
  );
};

export default InputSection;

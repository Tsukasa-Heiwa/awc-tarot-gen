import React, { ReactElement } from "react";
import Tarot from "../components/Tarot";
import "../css/tarot-layout.css";

interface Props {
    doneStateUpright: Array<boolean>,
    doneStateReverse: Array<boolean>,
    doneStateLastCard: boolean,
    sideCount: number
  }
const TarotLayout = (props:Props) => {
  const tarotContainer = (isReverse: boolean = false) => {
    const output: Array<ReactElement> = [];
    for (let i: number = 0; i < props.sideCount; i++) {
      output.push(<Tarot key={"tarot" + i} number={i} isReverse={isReverse} isDone={isReverse ? props.doneStateReverse[i] : props.doneStateUpright[i]}/>);
    }

    return <section className="tarot-container">{output}</section>;
  };

  return (
    <section id="tarot-layout" className="tarot-layout">
      {tarotContainer()}
      {<Tarot number={props.sideCount} isDone={props.doneStateLastCard}/>}
      {tarotContainer(true)}
    </section>
  );
};

export default TarotLayout;

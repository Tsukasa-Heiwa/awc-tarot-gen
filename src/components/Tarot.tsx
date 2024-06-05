import React from "react";
import "../css/tarot-styles.css";

interface Props {
  number: number;
  isReverse?: boolean;
  isDone?: boolean;
}

const Tarot = (props: Props) => {
  return (
    <div className={`tarot-card tarot${props.number} ${props.isReverse ? "reverse" : "upright"} ${props.isDone ? "tarot-done" : ""}`}></div>
  );
};

export default Tarot;

import React, { useCallback, useEffect, useState } from "react";
import InputSection from "./sections/InputSection";
import TarotLayout from "./sections/TarotLayout";
import "./css/styles.css";

const TAROT_COUNT: number = 22;
const STATE: string = "state";

const App: React.FC = () => {
  const [binaryState, setBinaryState] = useState<string>("");
  // const [doneStateReverse, setDoneStateReverse] = useState(Array(TAROT_COUNT).fill(false));
  const [doneStateReverse, setDoneStateReverse] = useState<boolean[]>([]);
  const [doneStateUpright, setDoneStateUpright] = useState<boolean[]>([]);
  const [doneStateLastCard, setDoneStateLastCard] = useState(false);

  useEffect(() => {
    setStatesFromBinary(localStorage.getItem(STATE) || "", true);
  }, []);

  function setStatesFromBinary(binary: string, skipSave?: boolean) {
    // array to store binary number
    let stateUpright: Array<boolean> = Array(TAROT_COUNT).fill(false);
    let stateReverse: Array<boolean> = Array(TAROT_COUNT).fill(false);
    let lastCardState: boolean = false;

    for (let i = 0; i < binary.length; i++) {
      const state = binary[i] == "1";
      if (i < TAROT_COUNT) stateUpright[i] = state;
      else if (i < TAROT_COUNT * 2) stateReverse[i - TAROT_COUNT] = state;
      else lastCardState = state;
    }

    setDoneStateUpright(stateUpright);
    setDoneStateReverse(stateReverse);
    setDoneStateLastCard(lastCardState);

    if (skipSave) {
      setBinaryState(binary.toString());
    } else {
      updateBinaryState(binary);
    }
  }

  function setBinaryFromStates(uprightStates: boolean[], reverseStates: boolean[], lastCardState: boolean) {
    const states: boolean[] = [...uprightStates, ...reverseStates, lastCardState];
    const binary = states.reduce((str: string, state: boolean) => str + (state ? "1" : "0"), "");
    updateBinaryState(binary);
  }

  function updateBinaryState(state: string) {
    setBinaryState(state);
    localStorage.setItem(STATE, state);
  }

  const toggleDoneStateUpright = useCallback(
    (index: number) => {
      setDoneStateUpright((prev: boolean[]) => {
        const newState: boolean[] = prev.map((val, j) => (index == j ? !val : val));
        setBinaryFromStates(newState, doneStateReverse, doneStateLastCard);
        return newState;
      });
    },
    [doneStateReverse, doneStateLastCard]
  );

  const toggleDoneStateReverse = useCallback(
    (index: number) => {
      setDoneStateReverse((prev: boolean[]) => {
        const newState: boolean[] = prev.map((val, j) => (index == j ? !val : val));
        setBinaryFromStates(doneStateUpright, newState, doneStateLastCard);
        return newState;
      });
    },
    [doneStateUpright, doneStateLastCard]
  );

  const toggleDoneStateLastCard = () => setDoneStateLastCard((prev) => !prev);

  return (
    <main>
      <TarotLayout
        doneStateUpright={doneStateUpright}
        doneStateReverse={doneStateReverse}
        doneStateLastCard={doneStateLastCard}
        sideCount={TAROT_COUNT}
      />
      <InputSection
        doneStateUpright={doneStateUpright}
        doneStateReverse={doneStateReverse}
        toggleDoneStateUpright={toggleDoneStateUpright}
        toggleDoneStateReverse={toggleDoneStateReverse}
        doneStateLastCard={doneStateLastCard}
        toggleDoneStateLastCard={toggleDoneStateLastCard}
        binaryState={binaryState}
        setBinaryState={setStatesFromBinary}
        sideCount={TAROT_COUNT}
      />
    </main>
  );
};

export default App;

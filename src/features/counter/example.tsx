"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import {
  decrement,
  increment,
  setCounter,
  incrementByAmount,
} from "./counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span style={{ margin: "0 20px", fontSize: "24px" }}>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter number"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={() => {
            const num = parseInt(inputValue);
            if (!isNaN(num)) {
              dispatch(setCounter(num));
              setInputValue("");
            }
          }}
        >
          Set Counter
        </button>

        <button
          onClick={() => {
            const num = parseInt(inputValue);
            if (!isNaN(num)) {
              dispatch(incrementByAmount(num));
              setInputValue("");
            }
          }}
          style={{ marginLeft: "10px" }}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}

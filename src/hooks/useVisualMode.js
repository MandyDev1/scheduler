import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(prev => {
      const newHistory = replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode];
      return newHistory;
    });
  }

  function back() {
    setHistory(prev => prev.length > 1 ? [...prev.slice(0, prev.length - 1)] : prev)
  }

  return { mode: history[history.length - 1], transition, back };
}
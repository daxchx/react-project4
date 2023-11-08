import { useState, useRef } from "react";

export default function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [addHour, setAddHour] = useState(0);
  const [addMinute, setAddMinute] = useState(0);
  const [addSecond, setAddSecond] = useState(0);

  const [startActive, setStartActive] = useState(false);
  const [stopActive, setStopActive] = useState(true);
  const [restartActive, setRestartActive] = useState(true);
  const [resetActive, setResetActive] = useState(true);

  const [inputActive, setInputActive] = useState(false);

  let count = addHour * 3600 + addMinute * 60 + addSecond;
  let intervalId = useRef<ReturnType<typeof setInterval>>();

  function handleStart() {
    setStartActive(true);
    setStopActive(false);
    setInputActive(true);

    if (count != 0) {
      intervalId.current = setInterval(() => {
        count--;
        setAddHour(Math.floor(count / 3600));
        setAddMinute(Math.floor((count / 60) % 60));
        setAddSecond(count % 60);

        if (count == 0) {
          setHour(0);
          setMinute(0);
          setSecond(0);
          setStartActive(false);
          setStopActive(true);
          setRestartActive(true);
          setInputActive(false);
          clearInterval(intervalId.current);
        }
      }, 1000);
    }
  }

  function handleStop() {
    setStopActive(true);
    setRestartActive(false);
    setResetActive(false);
    clearInterval(intervalId.current);
  }

  function handleReset() {
    clearInterval(intervalId.current);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setAddHour(0);
    setAddMinute(0);
    setAddSecond(0);
    setStartActive(false);
    setRestartActive(true);
    setResetActive(true);
    setInputActive(false);
  }

  function handleRestart() {
    setStopActive(false);
    setRestartActive(true);
    setResetActive(true);
    intervalId.current = setInterval(() => {
      count--;
      setAddHour(Math.floor(count / 3600));
      setAddMinute(Math.floor((count / 60) % 60));
      setAddSecond(count % 60);

      if (count == 0) {
        setHour(0);
        setMinute(0);
        setSecond(0);
        setStartActive(false);
        setStopActive(true);
        setRestartActive(true);
        setInputActive(false);
        clearInterval(intervalId.current);
      }
    }, 1000);
  }

  return (
    <div className="max-w-xs mx-auto py-4">
      <div className="flex justify-center pb-4 border-b border-gray-900">
        <input
          className="mr-2 px-2 py-1 border border-gray-800 rounded bg-gray-900 text-white disabled:opacity-50"
          type="number"
          value={hour}
          disabled={inputActive}
          onChange={(e) => {
            setHour(+e.target.value);
            setAddHour(+e.target.value);
          }}
          min="0"
          max="23"
        />
        <input
          className="mr-2 px-2 py-1 border border-gray-800 rounded bg-gray-900 text-white disabled:opacity-50"
          type="number"
          value={minute}
          disabled={inputActive}
          onChange={(e) => {
            setMinute(+e.target.value);
            setAddMinute(+e.target.value);
          }}
          min="0"
          max="59"
        />
        <input
          className="mr-2 px-2 py-1 border border-gray-800 rounded bg-gray-900 text-white disabled:opacity-50"
          type="number"
          value={second}
          disabled={inputActive}
          onChange={(e) => {
            setSecond(+e.target.value);
            setAddSecond(+e.target.value);
          }}
          min="0"
          max="59"
        />
        <button
          className="px-2 py-1 rounded bg-green-900 text-green-400 disabled:opacity-50"
          onClick={handleStart}
          disabled={count > 0 ? startActive : true}
        >
          start
        </button>
      </div>
      <div className="flex justify-center mt-8 text-6xl font-bold text-white">
        <div>
          {("00" + addHour).slice(-2)}:{("00" + addMinute).slice(-2)}:
          {("00" + addSecond).slice(-2)}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="mr-2 px-2 py-1 rounded bg-yellow-900 text-yellow-400 disabled:opacity-50"
          onClick={handleStop}
          disabled={stopActive}
        >
          stop
        </button>
        <button
          className="mr-2 px-2 py-1 rounded bg-green-900 text-green-400 disabled:opacity-50"
          onClick={handleRestart}
          disabled={restartActive}
        >
          restart
        </button>
        <button
          className="px-2 py-1 rounded  bg-gray-800 text-gray-400 disabled:opacity-50"
          onClick={handleReset}
          disabled={resetActive}
        >
          reset
        </button>
      </div>
    </div>
  );
}

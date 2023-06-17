"use client";
import { useState } from "react";

export default function Button() {
  const initialData = [{
    setup: "why did the chicken cross the road?",
    punchline: "to get to the other side",
  }];
  const [data, setData] = useState(initialData);

  const fetchData = async () => {
    const req = await fetch(
      "https://official-joke-api.appspot.com/jokes/programming/random"
    );
    const newData = await req.json();
    return setData(newData);
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <>
      <button onClick={handleClick}>FETCH DATA</button>
      {data.map((joke) => {
        return (<>
        <h1>{joke.setup}</h1>
        <h2>- {joke.punchline}</h2>
        <audio></audio>
        </>)
      })}
    </>
  );
}

import { useEffect, useState } from "react";

const DisplayRoom = () => {
  const [results, setResults] = useState([]);
  const getRooms = async () => {
    const response = await fetch("http://localhost:5000/rooms");
    const data = await response.json();
    console.log(data);
    setResults(data);
  };
  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div>
      {/* <button onClick={getRooms}>Button</button> */}
      {results.map((i) => {
        return <button key={i._id}>{i.name}</button>;
      })}
    </div>
  );
};

export default DisplayRoom;

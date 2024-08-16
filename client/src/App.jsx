import React, { useEffect, useState } from "react"; //useState intializes `token` state with value from `localStorage`, UseEffect updates `localStorage` with the new value
import Auth from "./components/Auth"; //user authentication
import Room from "./components/Room"; // for interacting with selected room
import DisplayRoom from "./components/DisplayRoom";

//functional react component to render different components based on the state
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); //state to store the authentication token retrieved from `localStorage`
  const [selectedRoom, setSelectedRoom] = useState(null); //function to update selected room
  

  //Updates local storage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  //Conditional rendering
  return (
    <div className="App">
      {!token ? (
        <Auth setToken={setToken} />
      ) : (
        <>
          <DisplayRoom />
        </>
      )}
    </div>
  );
};

export default App;

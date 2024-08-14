import React, { useState } from "react";
import Auth from "./components/Auth";
import Room from "./components/Room";

const App = () => {
  const [token, setToken] = useState("Hi" || localStorage.getItem("token"));
  return (
    <div className="App">
      {token ? (
        <Auth setToken={setToken} />
      ) : (
        <>
          <div>
            <h1>Chat Room:room_name</h1>
            <Room />
          </div>
        </>
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";

const Auth = ({ setToken }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleAuth = async () => {
    const endpoint = isRegister ? "/create" : "/login";
    const response = await fetch(`http://localhost:5000/users${endpoint}`,{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({firstName, lastName, email, password})
    });
    const data = await response.json();
    console.log(data)
    if (data.Token) {
      localStorage.setItem("token", data.Token);
      setToken(data.Token);
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <input
        type="texr"
        placeholder="First_Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last_Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isRegister ? "Register" : "Login"}</button>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default Auth;

import React,{useState} from 'react'

const Auth = ({setToken}) => {
 
 const [isRegister, setIsRegister] = useState(false);
 const [email, setEmail] = useState('');
 const [password,setPassword] = useState('') 
 const [firstName, setFirstName] = useState('')
const [lastName, setLastName ] = useState('')
 
 const handleAuth = async ()  =>{
 const endpoint = isRegister ? '/register' : '/login' ;
 const response = await fetch(`'http://localhost:9000/.com${endpoint}',{
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
    }`)  
const data = await response.json();
if (data.token){
    localStorage.setItem('token', data.token);
    setToken(data.token)
}

 }
 
 
 return (
    <div>
<h2>{isRegister ? 'Register' : 'Login'}</h2>
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
<button onClick={handleAuth}>
{isRegister ? 'Register': 'Login'}
</button>
<button onClick={() => setIsRegister(!isRegister)}>
    {isRegister ? 'Switch to Login': 'Switch to Register'}
</button>
    </div>
  )
}

export default Auth

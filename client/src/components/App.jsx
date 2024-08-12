import React, {useState} from 'react'
import Auth from './Auth'

const App = () => {
 const [token, setToken] = useState(localStorage.getItem)('token');   
  return (
    <div className='App'>
       {!token ?(
        <Auth setToken={setToken}/>
       ) : (
        <>
        <div>
            <h1>Chat Room:{room}</h1>
            {/* Adding the Room Component here */}
        </div>
        </>
       )
    }   
        </div>
  )
}

export default App
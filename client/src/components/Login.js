import Axios  from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie'

function Login({setIsAuth}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const cookies = new Cookies()
    
    const handleLogin = (e)=>{
      
        e.preventDefault()
       
        Axios.post("http://localhost:5000/signup",{username,password}).then(res=>{
            const {token,userId,name,username} = res.data
            cookies.set("token",token)
            cookies.set("userId",userId)
            cookies.set("name",name)
            cookies.set("username",username)
            setIsAuth(true)
        })
        
       // setUser({username:'',password:''})

    }
  return (
    <div className='login'>
        <h2>Register</h2>
            <label>Username</label>
            <input type="text" placeholder='Enter username' name='username'  onChange={(event) => {
          setUsername(event.target.value);
        }} minLength={2} required />
            <label>Password</label>
            <input type="password" placeholder='Enter password' name='password' onChange={(event) => {
          setPassword(event.target.value);
        }} required />
           
            <br />
            <button onClick={handleLogin}>Register</button>
        
    </div>
    
  )
}

export default Login
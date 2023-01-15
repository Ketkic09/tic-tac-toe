import Axios  from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie'

function Login({setIsAuth}) {
    const [user,setUser] = useState({username:'',password:''})
    const cookies = new Cookies()
    const onChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handleLogin = (e)=>{
      
        e.preventDefault()
       // console.log({user})
        Axios.post("http://localhost:5000/signup",user).then(res=>{
            const {token,userId,name,username} = res.data
            cookies.set("token",token)
            cookies.set("userId",userId)
            cookies.set("name",name)
            cookies.set("username",username)
            setIsAuth(true)
        })
        
        setUser({username:'',password:''})

    }
  return (
    <div className='login'>
        <h2>Login</h2>
            <label>Username</label>
            <input type="text" placeholder='Enter username' name='username' value={user.username} onChange={onChange} minLength={2} required />
            <label>Password</label>
            <input type="password" placeholder='Enter password' name='password' value={user.password} onChange={onChange} minLength={8} required />
           
            <br />
            <button onClick={handleLogin}>Log in</button>
        
    </div>
    
  )
}

export default Login
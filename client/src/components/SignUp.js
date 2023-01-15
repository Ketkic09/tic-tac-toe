import React, { useState } from 'react'
import Axios from'axios'
import Cookies from 'universal-cookie'
import Button from 'react-bootstrap/Button';

function SignUp({setIsAuth}) {
    const [user,setUser] = useState(null)
    const cookies = new Cookies()
    
    const handleSignup = (e)=>{
        e.preventDefault()
       // console.log({user})
        Axios.post("http://localhost:5000/signup",user).then(res=>{
            const {token,userId,name,username,hashedPswd} = res.data
            cookies.set("token",token)
            cookies.set("userId",userId)
            cookies.set("name",name)
            cookies.set("username",username)
            cookies.set("password",hashedPswd)
            setIsAuth(true)
        })
        
        setUser({name:'',username:'',password:''})
    }
  return (
    <div className='signUp'>
    <h2>SignUp</h2>
        
            <label>Name</label>
            <input type="text" placeholder='Enter full name' name='name'
            onChange={(event) => {
                setUser({ ...user, name: event.target.value });
            }} 
            minLength={2} required />
            <label>Username</label>
            <input type="text" placeholder='Enter username' name='username' 
            onChange={(event) => {
                setUser({ ...user, username: event.target.value });
            }}  
            minLength={2} required />
            <label>Password</label>
            <input type="password" placeholder='Enter password' name='password' 
            onChange={(event) => {
                setUser({ ...user, password: event.target.value });
            }}  minLength={8} required />
            <p>password should have 8 characters minimum</p>
            <br />
            <Button variant="light" onClick={handleSignup}>Signup</Button>
        
    </div>
  )
}

export default SignUp
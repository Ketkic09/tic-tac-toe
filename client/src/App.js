// eslint-disable-next-line

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from "universal-cookie";
import Login from "./components/Login";
import { useState } from "react";
import JoinGame from "./components/JoinGame";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Column from "react-bootstrap/Col"


function App() {
  const api_key = process.env.REACT_APP_API_KEY
  const api_secret = process.env.REACT_APP_API_SECRET
  const cookies = new Cookies()
  const token = cookies.get("token")
  const client = StreamChat.getInstance(api_key)
  const [isAuth,setIsAuth] = useState(false)
  
  const logOut = ()=>{
    cookies.remove("token")
    cookies.remove("name")
    cookies.remove("username")
    cookies.remove("hashedPswd")
    cookies.remove("channelName")
    cookies.remove("userId")
    client.disconnectUser()
    setIsAuth(false)
  }
  
  if (token){
    client.connectUser({
      id:cookies.get("userId"),
      name: cookies.get("username"),
      fname: cookies.get("name"),
      hashedPswd: cookies.get("hashedPswd")
    },token).then((user)=>{
      console.log(user)
      setIsAuth(true)
    })
  }
  return (
    <div className="App">
      {isAuth?(
        <>
            <Chat client={client}>
              <Container>
                <Row >
                  <Column className="d-flex justify-content-center">
                    <JoinGame />
                  </Column>
                  
                </Row>
                
                <Row>
                <Column className="d-flex justify-content-center logout">
                  <button onClick={logOut} >Log out</button>
                  </Column>
                </Row>
                
              </Container>
            </Chat> 
        
        </>
        ):
      ( <>
        <Container>
        <Row>
          <Column>
          <h1>Let's play tic-tac-toe</h1>
          </Column>
        </Row> 
          <Row>
            
            <Column>
            <Login setIsAuth={setIsAuth} />
            </Column>
          </Row>
        </Container>
       
        <br></br>
       
        </>
        )}
      
    </div>
  );
}

export default App;

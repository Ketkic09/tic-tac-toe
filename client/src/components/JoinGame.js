import React, { useState } from 'react'
import {useChatContext,Channel} from 'stream-chat-react';
import Game from './Game';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Button from 'react-bootstrap/Button';


function JoinGame() {
  const [rivalUsername,setRivalUsername] = useState("")
  const {client} = useChatContext()
  const [channel,setChannel] = useState(null)
  const createChannel = async ()=>{
    const response = await client.queryUsers({
      name:{$eq: rivalUsername} //if name === rival username
    })
    if (response.users.length === 0){
      alert("user not registered")
      return
    }
    console.log(response.users)
    const newChannel = await client.channel("messaging",{
      members: [client.userID,response.users[0].id]  //creating channel between two user and rival
    })
    await newChannel.watch()
    setChannel(newChannel) 
  }
  return (
    <>
    {channel? (<Channel channel={channel}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>) :
      (<>
   
      <Container className="join">
        <Row>
          <h4>Create Game</h4>
            <p>Enter rival's username to start the game</p>
            <input 
              placeholder='Enter username of rival'
              onChange={(event)=>{
                setRivalUsername(event.target.value)
              }}/> 
          <Button variant="light" onClick={createChannel}>Join/Start new game</Button>      
        </Row>
      </Container>
        </>
        )}
    </>
    
  )
}

export default JoinGame
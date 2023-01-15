import React, { useState } from 'react'
import Board from './Board';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Column from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

function Game({channel,setChannel}) {
  const [playersJoined,setPlayersJoined] = useState(channel.state.watcher_count === 2)
  const [result,setResult] = useState({winner:"na",state:"na"})

  channel.on("user.watching.start",(event)=>{
    setPlayersJoined(event.watcher_count === 2)
  })
  if(!playersJoined){
    return <h4>Waitng for rival to join...</h4>
  }
    return (
      <Container>
        <Row >
        <Column >
        <button className='btn btn-outline-danger btn-sm'
              onClick={async () => {
              await channel.stopWatching();
              setChannel(null);
            }}
          >
            {" "} 
            Leave Game
          </button>
          </Column>
        
        <Column>
          <br></br> 
          {result.state === "na" && <h4>Game started!</h4>}
          {result.state==="won" && <h4>{result.winner} is the winner!</h4>}
          {result.state==="tie" && <h4>No one Won</h4>}  

           <Board result={result} setResult={setResult} />
            
        </Column>
          
          </Row>
      </Container>
        
      )
    
    
}

export default Game
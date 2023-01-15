import React, { useEffect, useState } from 'react'
import Square from './Square'
import { useChannelStateContext, useChatContext } from 'stream-chat-react'
import { Patterns } from './WinningPattern'

function Board({result,setResult}) {
    const [board,setBoard] = useState(["","","","","","","","",""]) //to hold the current state of each square
    const [player,setPlayer] = useState("X") //setting first player X
    const [turn, setTurn] = useState("X") //setting first turn X
    const {channel} = useChannelStateContext()
    const {client} = useChatContext()

    useEffect(() => {
      checkWin();
      checkTie();  //call the check win whenever a move is made i.e change in board array
    }, [board])
    

    const chooseSquare = async(square)=>{
        if(turn === player && board[square] === ""){
            setTurn(player === "X"? "O":"X")
            
            await channel.sendEvent({  //to send event to everyone on this channel
                type:"game-move",
                data:{square,player} //which square and player made this move
            })

            setBoard(
                board.map((val,idx)=>{
                    if(idx === square && val === ""){
                        return player  //sets the value to the board
                    }
                return val  //remaining values of squares stay the same
                })
            )
           
            
        }

    }

    const checkWin = ()=>{
        //to check winning pattern by iterating over Patterns array
        Patterns.forEach((currentPattern)=>{
            const firstPlayer = board[currentPattern[0]]  // tells X or O stored on the first block of the winning pattern
            if(firstPlayer === "") return false  //if noting stored on that block break out of the loop go on next currentPattern
            let patternFound = true
            currentPattern.forEach((idx)=>{  //if something palced on the block check if the pattern is formed by X or O if some other player found then Wining pattern not found
                if(board[idx]!==firstPlayer){
                    patternFound = false
                }
            })
            // if winning pattern found alert 
            if(patternFound){
                setResult({winner:board[currentPattern[0]],state:"won"})
                
            }
        })
       
    }

    const checkTie = ()=>{
        let isFilled = true
        board.forEach((square)=>{
            if(square === "") {
                isFilled = false
            }
        })
        if(isFilled){
            
            setResult({winner:"none",state:"tie"})
        }
    }
    
    // writing the event
  channel.on((event)=>{
    if (event.type === "game-move" && event.user.id !== client.userID){   //event.user.id is the user who is sending the info
        
        const currentPlayer =  event.data.player ===  "X"? "O":"X"
        setPlayer(currentPlayer)
       
        setTurn(currentPlayer)
        //checking on which square the event occurs
        setBoard(
            board.map((val,idx)=>{
                if(idx === event.data.square && val === ""){
                    return event.data.player  //fill it in with whichever player made the move
                }
            return val  //remaining values of squares stay the same
            })
        )
       
    }
  })
  
  return (
    <div className='board'>
        <div className='row'>
            <Square chooseSquare={()=>{chooseSquare(0)}} val={board[0]} />
            <Square chooseSquare={()=>{chooseSquare(1)}} val={board[1]} />
            <Square chooseSquare={()=>{chooseSquare(2)}} val={board[2]}/>
        </div>
        <div className='row'>
            <Square chooseSquare={()=>{chooseSquare(3)}} val={board[3]} />
            <Square chooseSquare={()=>{chooseSquare(4)}} val={board[4]}/>
            <Square chooseSquare={()=>{chooseSquare(5)}}val={board[5]}/>
        </div>
        <div className='row'>
            <Square chooseSquare={()=>{chooseSquare(6)}} val={board[6]}/>
            <Square chooseSquare={()=>{chooseSquare(7)}} val={board[7]}/>
            <Square chooseSquare={()=>{chooseSquare(8)}} val={board[8]}/>
        </div>
    </div>
  )
  
}

export default Board 
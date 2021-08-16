// import {useRef} from "react"
import {useContext,useEffect,useRef} from "react"
import {UserContext} from "../contexts/userContext"
import {ConverseContext}  from "../contexts/converseContext"

let localStyle = {
    "fontSize":"40px",
    "color":"grey",
    "textAlign":"center",
    "marginTop":"100px"
}


export default function Chats({messages,typingRef})
{
    const {user:{username}} = useContext(UserContext)
    const {converseWith} = useContext(ConverseContext)
    const  chatObj = useRef()


    useEffect(()=>{
        chatObj.current.scrollTop = chatObj.current.scrollHeight
    })
    
    const defaultMessage = messages.chats.length ? (
          messages.chats.map(mObj=>(
                <div className={ mObj.sender === username.toLowerCase() ? "from" : "to"} key={Math.random()}>
                    <div className="message"><span>{mObj.message}</span></div>
                </div>
          ))
    ):(
        <div style={localStyle}>Start a chat with {converseWith}</div>
    )


    return (
        <div ref={chatObj} className="chats">
          {defaultMessage}
          <div className="typing" ref={typingRef}></div>
        </div>
    )
}
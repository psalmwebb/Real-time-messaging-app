
import {useContext} from "react"
import {UserContext} from "../contexts/userContext"
import {LatestChatContext} from "../contexts/latestChatContext"
import { ConverseContext } from "../contexts/converseContext"
import { UiContext } from "../contexts/uiContext"


export default function ChatList({onClickClose})
{
  
    const {user:{username}} = useContext(UserContext)
    const {latestChats} = useContext(LatestChatContext)
    const {converseWith,setConverseWith} = useContext(ConverseContext)
    const {compToShow,setCompToShow} = useContext(UiContext);

    function handleClick(recipient){

        if(compToShow === "sidebar"){
          setCompToShow("chatspace");  
        }

        setConverseWith(recipient)
    }

    const latest = latestChats.length ? (
        latestChats.map(chatObj=>{
            let recipient = username === chatObj.sender ? chatObj.recipient : chatObj.sender

            return (
                <div className={converseWith.toLowerCase() === recipient ? "l-chat-active" : "l-chat"} key={Math.random()} onClick={handleClick.bind(this,recipient)}>
                    <div className="l-chat-res">{recipient}</div>
                    <div className="l-chat-message">{chatObj.message}</div>
                </div>
            )
        }) 
    ): null


    return (
        <div className="chat-list">
            <div>{latest ? latest : <div className="default">No chats yet...</div>}</div>
        </div>
    )
}
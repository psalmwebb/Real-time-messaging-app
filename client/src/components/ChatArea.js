import Chats from "./Chats";
import {useRef,useState,useEffect,useContext} from "react"
import {getMessagesWithRecs,saveChat,saveLatestChat} from "../utils/utils"
import {UserContext} from "../contexts/userContext"
import {ConverseContext} from "../contexts/converseContext"
import {LatestChatContext} from "../contexts/latestChatContext"
import {SocketContext} from "../contexts/socketContext"
import { UiContext } from "../contexts/uiContext";



export default function ChatArea()
{
    const inputObj = useRef();
    const {converseWith}  = useContext(ConverseContext);
    const {user:{username}} =  useContext(UserContext);
    const {addChat} = useContext(LatestChatContext);
    const socket = useContext(SocketContext);
    const [messages,setMessages] = useState({"chats":[]});
    const {compToShow,setCompToShow} = useContext(UiContext);

    const typingRefObj = useRef();

    // console.log("rendered...")

    function handleSend(e)
    {
        if (!inputObj.current.value) return 

        let newMessage = {
            sender:username.toLowerCase(),
            recipient:converseWith.toLowerCase(),
            message:inputObj.current.value,
            dateSent:Date.now()
        }
      setMessages(prevMessages=>{
        //   console.log("messages set")
          return {"chats":[...prevMessages.chats,newMessage]}
      })
      
      addChat(newMessage)
      socket.emit("send-message",newMessage)
      saveChat(newMessage)
      saveLatestChat(newMessage)
      inputObj.current.value = ""
    }

    useEffect(()=> {

        typingRefObj.current.textContent = ""

        socket.on("receive-message",(mObj)=>{

            typingRefObj.current.textContent = ""
            setMessages(prevMessages=>{
                return {"chats":[...prevMessages.chats,mObj]}
            })
            addChat(mObj)
        })

        socket.on("typing",(mObj)=>{
            // console.log("typing")
            typingRefObj.current.innerHTML = "typing..."
        })

        return ()=> {
            socket.off("receive-message")
            socket.off("typing")
        }
    })


    useEffect(()=>{
       
        getMessagesWithRecs(username,converseWith).then(message=>{
            setMessages(message)
        })

    },[converseWith,username])


    function handleInputChange()
    {
        
        socket.emit("typing",converseWith)
    }

    function handleClick(){

        setCompToShow('sidebar');
    }

    return (
        <div className="chat-area">
            <div className="chat-area-nav">
               { compToShow === "chatspace" && <button onClick={handleClick}>
                   <i className="fas fa-arrow-left"></i>
                   </button> }

               <span className="recipient">{converseWith}</span>
            </div>

             <Chats messages={messages} typingRef={typingRefObj}/>

            <div className="send-message-div">
               <input type="text" placeholder="Type a message" ref={inputObj} onChange={handleInputChange}/>  
               <button onClick={handleSend}><i className="fas fa-paper-plane"></i></button>
            </div>
        </div>
    )
}
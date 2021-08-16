
import {createContext,useState,useContext,useEffect} from "react"
import {UserContext} from "./userContext"
import {getAllLastestChat} from "../utils/utils"


export const LatestChatContext = createContext()


export default function LatestContextProvider({children})
{
    const [latestChats,setLatestChats] = useState([])

    const {user} = useContext(UserContext)


    useEffect(()=>{
      getAllLastestChat(user.username).then(data=> setLatestChats(data.latest))

    },[user])

    function addChat(chatObj)
    {
      setLatestChats(prevChats=>{
          let filteredChat = prevChats.filter((chat)=>{
            
             return (chat.sender !== chatObj.sender || chat.recipient !== chatObj.recipient) &&
                    (chat.sender !== chatObj.recipient  || chat.recipient !== chatObj.sender)
          })

          // console.log(filteredChat)

          return [chatObj,...filteredChat]
      }) 
    }

    return (
        <LatestChatContext.Provider value={{latestChats,addChat}}>
           {children}
        </LatestChatContext.Provider>
    )
}

import io from "socket.io-client"
import {createContext,useContext,useEffect,useState} from "react"
import {UserContext} from "../contexts/userContext"


export const SocketContext = createContext();


const URL = process.env.REACT_APP_MODE === "development" ? "http://localhost:5000" : "/";



export default function SocketContextProvider({children})
{
    const {user:{username}} = useContext(UserContext);

    const [socket,setSocket] = useState({});

    useEffect(()=>{
        
        if(username){
            setSocket(io.connect(URL,{query:{username:username}}));
        }

    },[username]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
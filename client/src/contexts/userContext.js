import {createContext,useState,useEffect} from "react"
import {checkUserLoggedIn} from "../utils/utils"

export const UserContext = createContext()

export default function UserContextProvider({children})
{
    const [user,setUser] = useState({})
    const [toCheckUser,setToCheckUser] = useState(false)
   
    // console.log(user)
    useEffect(()=>{
      
        (async ()=>{

            let getUserInfo = await checkUserLoggedIn()
            
            getUserInfo ? setUser(getUserInfo) : setUser({})
            setToCheckUser(true)
        })()
    },[])

    const loader = (
        <div className="loader-div">
            <div className="loader"></div>
        </div>
    )

    return (
        <>
            <UserContext.Provider value={{user,setUser}}>
            { toCheckUser ? children  : loader}
            </UserContext.Provider>
        </>
    )
}
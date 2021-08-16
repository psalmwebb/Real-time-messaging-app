import Sidebar from "./sidebar"
import Chatspace from "./chatspace"
import {UserContext} from "../contexts/userContext"
import {useContext} from "react"
import {withRouter} from "react-router-dom"
import {useLayoutEffect} from "react"
import { UiContext } from "../contexts/uiContext"


export default withRouter(function Dashboard({history:{push}})
{
    const {user} = useContext(UserContext)

    const {compToShow} = useContext(UiContext);

 
    console.log(compToShow);
    useLayoutEffect(()=>{
      if(!user.username) push("/login") 

      // window.onresize =(e)=>{
      //    setCompToShow(['chatspace','sidebar'])
      //    console.log("Resized")
      // }
    })
  
    return (
        <div className="dashboard">
          { compToShow.toLowerCase() !== "chatspace" && <Sidebar/> }
          { compToShow.toLowerCase() !== "sidebar" && <Chatspace/> }
        </div>
    )
})
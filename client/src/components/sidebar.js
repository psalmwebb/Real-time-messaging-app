import ChatList from "./chatlist"
import Contact from "./Contact"
import {useState,useContext,useRef} from "react"
import { UiContext } from "../contexts/uiContext"
import "./scss/sidebar.scss"


let tabStyle = {
    "backgroundColor":"grey",
    "color":"black"
}

export default function Sidebar({setCompToShow}){

    const [tab,setTab] = useState("Chats");
    const sideBarRef = useRef()

    const {compToShow} = useContext(UiContext);

    const style = {
        width:compToShow === "sidebar" ? "100%" : "30%"
    }

    return (
        <div  className="side-bar" style={style} ref={sideBarRef}>
            <ul>
                <li style={ tab === "Contacts" ? tabStyle : null } onClick={()=> setTab("Contacts")} >
                   <i className="fas fa-address-book"></i>
                </li>
                <li style={ tab === "Chats" ? tabStyle : null } onClick={()=> setTab("Chats")}>
                   <i className="fas fa-comment-alt"></i>
                </li>
            </ul>
            { tab === "Chats" ? <ChatList/> : <Contact/> }
        </div>
    )
}
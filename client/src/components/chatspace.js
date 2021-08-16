
import {ConverseContext} from "../contexts/converseContext"
import {useContext} from "react"
import ChatArea from "./ChatArea"
import { UiContext } from "../contexts/uiContext"
import "./scss/chatspace.scss"

export default function Chatspace({onClickClose})
{

    const {converseWith} = useContext(ConverseContext)

    const {compToShow} = useContext(UiContext);

    const style = {
        width: compToShow === "chatspace" ? "100%" : "70%",
        left:compToShow === "chatspace" ? "0" : "30%"
    }

    const defaultRes = (
        <div className="no-messages">
            No Messages...
        </div>
    )


    return (
        <div className="chat-space" style={style}>
         
           {converseWith ? <ChatArea onClickClose={onClickClose}/> : defaultRes}
        </div>
    )
}

import {useContext} from "react"
import {UserContext} from "../contexts/userContext"
import {ConverseContext} from "../contexts/converseContext"
import { UiContext } from "../contexts/uiContext"

export default function AllContact({setFindContact})
{
    
    const {user} = useContext(UserContext)
    const {setConverseWith} = useContext(ConverseContext)

    const {compToShow,setCompToShow} = useContext(UiContext);

    let allContacts = user.contacts.length > 0 ? (
         user.contacts.map(contact=>(
             <div key={Math.random()} onClick={handleClick.bind(this,contact)} className="contact">
                 {contact}
            </div>
         ))
    ):(
       <span>You have no contact(s) yet...</span>
    )

    function handleClick(contact){

        if(compToShow === "sidebar"){
          setCompToShow("chatspace");  
        }

        setConverseWith(contact)
    }


    return (
        <div className="all-contacts">
            {allContacts}
            <button onClick={()=> setFindContact(true)}>Add a Contact</button>
        </div>
    )
}
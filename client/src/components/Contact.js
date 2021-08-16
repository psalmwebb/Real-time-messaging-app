import {useState} from "react";
import AddContact from "./AddContact";
import AllContact from "./AllContacts";

export default function Contact()
{
    const [findContact,setFindContact] = useState(false)

 
    function handleClose()
    {
        setFindContact(false)
    }

    return (
        <div className="friends">
           {findContact ? 
           <>
                <AddContact close={handleClose}/> 
                <AllContact setFindContact={setFindContact}/>
           </>   
           : <AllContact setFindContact={setFindContact}/> }
        </div>
    )
}

import {useContext,useState,useRef} from "react"
import {UserContext} from "../contexts/userContext"
import {addNewContact} from "../utils/utils"

let localStyle = {
    "position":"fixed",
    "top":"15%",
    "left":"25%",
    "height":"30%",
    "width":"40%",
    "color":"white",
    "backgroundColor":"#111",
    "zIndex":"1000"
}


export default function AddContact({close})
{
    const {setUser} = useContext(UserContext)
    const [contactToAdd,setContactToAdd] = useState("")
    const errorDiv = useRef()

    async function handleSubmit(e)
    {
        e.preventDefault()

        if(contactToAdd){
           let updatedUser = await addNewContact(contactToAdd)

           if(updatedUser.error){    
               
              errorDiv.current.textContent = updatedUser.error
           }
           else{
             close()

             setUser(updatedUser)
           }
        }
        else errorDiv.current.textContent = "Field cannot be empty"
    }

    function handleChange(e)
    {
      errorDiv.current.textContent = ""
      setContactToAdd(e.target.value)
    }

    return (
        <form style={localStyle} onSubmit={handleSubmit}>
            <center><h2>New Contact</h2></center>
            <div>
               <label>Username</label>
            </div>
            <div>
               <input type="text" onChange={handleChange}/>
            </div>
            <div ref={errorDiv}></div>
            <div>
               <button onClick={handleSubmit} style={{'margin':'0 10px 0 0'}}>ADD</button>
               <button type="button" onClick={close} style={{'margin':'0 10px 0 0'}}>CLOSE</button>
            </div>
        </form>
    )
}
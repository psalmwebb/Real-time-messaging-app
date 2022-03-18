
import {useState,useContext,useRef} from "react"
import {LoginUser} from "../utils/utils"
import {UserContext} from "../contexts/userContext"


export default function Login()
{
    const [formData,setFormData] = useState({})
    const {setUser} = useContext(UserContext)
    const errorDiv = useRef()
    

    async function handleSubmit(e)
    {
       e.preventDefault()

       let user = await LoginUser(formData)
       
       user ? setUser(user) : errorDiv.current.innerHTML ="Invalid Credentials..."
    }

    function handleChange(e)
    {
       setFormData({...formData,[e.target.name]:e.target.value}) 
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div ref={errorDiv} style={{"color":"white","textAlign":"center"}}></div>
            <div>
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange}/>
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange}/>
            </div>

            <div>
                <button style={{'width':"100%"}}>Log In</button>
            </div>

            <div>
                <p style={{'color':'grey','textAlign':'center'}}>Username : james</p>
                <p style={{'color':'grey','textAlign':'center'}}>Password : james123</p>
            </div>
        </form>
    )
}
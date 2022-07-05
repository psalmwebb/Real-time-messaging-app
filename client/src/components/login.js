
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

       e.target.textContent = "Logging In...";
       let user = await LoginUser(formData)
       
       user ? setUser(user) : errorDiv.current.innerHTML ="Invalid Credentials..."
       e.target.textContent = "Log In";
    }

    function handleChange(e)
    {
       setFormData({...formData,[e.target.name]:e.target.value}) 
    }
    
    return (
        <>
        <form>
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
                <button onClick={handleSubmit} style={{'width':"100%"}}>Log In</button>
            </div>
        </form>
        <div id="loginInfo">
            <div>
                <h4>LOGIN CREDENTIALS</h4>
                <div>
                  <span>Username :</span>
                  <span>james</span>
                  <br/>
                  <span>Password : </span>
                  <span>james123</span>
                </div>
                <div>
                  <span>Username :</span>
                  <span>bean</span>
                  <br/>
                  <span>Password : </span>
                  <span>bean123</span>
                </div>
            </div>
        </div>
        </>
    )
}
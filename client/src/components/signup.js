
import {useState,useContext} from "react"
import {SignupUser} from "../utils/utils"
import {UserContext} from "../contexts/userContext"


export default function Signup()
{
    const [formData,setFormData] = useState({})
    const {setUser} = useContext(UserContext)
    const [formErrors,setFormErrors] = useState({})
    

    async function handleSubmit(e)
    {
      e.preventDefault()
      let user = await SignupUser(formData)

      user.errors  ? setFormErrors(user.errors) : setUser({...user})
    }

    function handleChange(e)
    {
       setFormData({...formData,[e.target.name]:e.target.value}) 
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange}/>
                <span>{formErrors.username}</span>
            </div>

            <div>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange}/>
                <span>{formErrors.email}</span>
            </div>

            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange}/>
                <span>{formErrors.password}</span>
            </div>

            <div>
                <button style={{'width':'100%'}}>Sign Up</button>
            </div>
        </form>
    )
}
import {Link} from "react-router-dom"
import {useContext,useEffect} from "react"
import {UserContext} from "../contexts/userContext"
import {ConverseContext} from "../contexts/converseContext"
import {SocketContext}  from "../contexts/socketContext"
import {withRouter} from "react-router-dom"
import {LogoutUser} from "../utils/utils"

export default withRouter(function Navbar(props)
{
    const {user,setUser} = useContext(UserContext)
    const {setConverseWith} = useContext(ConverseContext)
    const socket = useContext(SocketContext)
 
    let validURLS = ["/dashboard","/login","/signup","/"]

    let currentURl = props.history.location.pathname

    let buttonStyle = {
        'padding':"7px",
        'backgroundColor':'#222',
        'color':"white",
        'margin':'10px'
    }
    

    // console.log("You rendered me")

    useEffect(()=>{
       
       if(Object.keys(user).length > 0 ) props.history.push("/dashboard")

    },[user,props.history])
    

    function handleLogout()
    {
        setConverseWith("")
        setUser({})
        socket.close()
        LogoutUser()
        props.history.push("/login")
    }
    
    const defaultData = (
        validURLS.includes(currentURl) ? (<nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
        </nav>) : <nav></nav>
    )

    const loggedInUserData = (
        <nav>
            <span>
                  {Object.keys(user).length > 0  ? `Welcome, ${user.email}` : null} 
                  <button onClick={handleLogout} style={buttonStyle}>Log Out</button>
            </span>
        </nav>
    )

    return (
        Object.keys(user).length > 0  ? loggedInUserData : defaultData
    )
})

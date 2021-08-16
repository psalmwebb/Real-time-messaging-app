
import Navbar from "./components/navbar"
import Welcome from "./components/Welcome"
import Dashboard from "./components/Dashboard"
import Signup from "./components/signup"
import Login from "./components/login"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import UserContextProvider from "./contexts/userContext"
import SocketContextProvider from "./contexts/socketContext"
import ConverseContextProvider from "./contexts/converseContext"
import LatestContextProvider from "./contexts/latestChatContext"
import  UiContextProvider from "./contexts/uiContext"
import FourZeroFour from "./components/404"

export default function App()
{
    
    return (
        <>
          <BrowserRouter>
          <UiContextProvider>
          <UserContextProvider>
              <SocketContextProvider>
                <ConverseContextProvider>
                  <LatestContextProvider>
                   <Navbar/>
                    <div className="app">
                      <Switch>
                        <Route exact path="/" component={Welcome}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/signup" component={Signup}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/:id" component={FourZeroFour}/>
                      </Switch>
                    </div>
                  </LatestContextProvider>
                </ConverseContextProvider>
              </SocketContextProvider>
            </UserContextProvider>
            </UiContextProvider>
          </BrowserRouter>
        </>
    )
}
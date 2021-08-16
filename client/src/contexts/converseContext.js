import {createContext,useState} from "react"


export const ConverseContext = createContext()

export default function ConverseContextProvider({children})
{
    const [converseWith,setConverseWith] = useState("")

    // console.log(converseWith)

    return (
        <ConverseContext.Provider value={{converseWith,setConverseWith}}>
           {children}
        </ConverseContext.Provider>
    )
}
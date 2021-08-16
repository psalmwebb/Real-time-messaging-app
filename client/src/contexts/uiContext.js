import { createContext,useState,useEffect } from "react";

export const UiContext = createContext()


export default function UiContextProvider({children}){

   const [compToShow,setCompToShow] = useState("");

   useEffect(()=>{
      
     makeResponsive();

     window.onresize=function(){
         makeResponsive();
     }
   },[])

   function makeResponsive(){
        if(window.innerWidth <= 700){
            setCompToShow("sidebar");
        }
        else{
            setCompToShow("");
        }
   }

   return (
       <UiContext.Provider value={{compToShow,setCompToShow}}>
         {children}
       </UiContext.Provider>
   )
}
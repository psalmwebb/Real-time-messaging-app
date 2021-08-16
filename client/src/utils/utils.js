
const URL = process.env.REACT_APP_MODE === "development" ? "http://localhost:5000/" : "/"


export const SignupUser = async (obj)=>{

    let data = await fetch(`${URL}api/signup`,{
        method:"post",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
  
    return await data.json()
}


export const LoginUser = async (obj)=>{
  
    let data = await fetch(`${URL}api/login`,{
      method:"post",
      credentials:"include",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
    })

    data = await data.json()

    return data.user ? data.user : null
}



export const checkUserLoggedIn = async ()=>{

    let data = await fetch(`${URL}api/is-logged-in`,{
        method:"get",
        credentials:"include",
    })

    data = await data.json()

    return data.user ? data.user : null
}


export const LogoutUser = async ()=>{

    await fetch(`${URL}api/logout`,{
        method:"get",
        credentials:"include",
    })

}

export const addNewContact = async (contactToAdd)=>{

    let user = await fetch(`${URL}api/update-user/add-contact?contact=${contactToAdd}`,{
        method:"put",
        credentials:"include",
    })

    user = await user.json()

    return user.error ? user : {...user.updatedUser}
}


export const saveChat = async ({sender,recipient,message,dateSent}) =>{
    await fetch(`${URL}api/update-chats/add-chats`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({sender,recipient,message,dateSent})
    })

}

export const saveLatestChat = async ({sender,recipient,message,dateSent})=>{
   
    await fetch(`${URL}api/save-latest-chat`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({sender,recipient,message,dateSent})
    })

    // data = await data.json()

    // console.log(data)
}


export const getAllLastestChat = async (user)=>{

   let data = await fetch(`${URL}api/get-lastest-chat`,{
       method:"post",
       headers:{
           "Content-Type":"application/json"
       },
       body:JSON.stringify({user})
   })

   data = await data.json()
   
   return data
}


export const getMessagesWithRecs = async (sender,recipient) =>{

    let data = await fetch(`${URL}api/find-chats`,{
       method:"post",
       headers:{
           "Content-Type":"application/json"
       },
       body:JSON.stringify({sender,recipient})
    })

    data = await data.json()

    return data
}
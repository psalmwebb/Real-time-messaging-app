

export default function Welcome(props)
{
    return (
        <div className="welcome">
            <div className="first">
               <h1>
                  EASILY CONVERSE WITH FRIENDS
               </h1>
               <div>
                 <button onClick={()=> props.history.push('/login')}>START NOW</button>
               </div>
            </div>

            <div className="second">
               <div className="img">

               </div>
            </div>
        </div>
    )
}
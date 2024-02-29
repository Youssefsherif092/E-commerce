import { createContext, useState } from "react";


export let userContext = createContext()

export default function UserContextProvider(myprops){
  const [userToken,setToken] = useState(null);
  return <userContext.Provider value={{userToken,setToken}}>
    {myprops.children}
  </userContext.Provider>
}
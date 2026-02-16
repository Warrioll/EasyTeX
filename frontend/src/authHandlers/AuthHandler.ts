import axios from "axios"



const notAuthPath="/sessionExpired";
const authPath="/dashboard";

export const noSessionHandler = ()=>{
  localStorage.setItem('401', 'true')
  window.location.href = notAuthPath;
}

export const checkIfLoggedIn =async ()=>{
    try{
                const response = await axios.get(`http://localhost:8100/auth/verifySession`, {
                    withCredentials: true,
                    headers: {
                      "Accept": "application/json",
                    }
                  })
                  console.log("status dashboard: ", 200)
                if(response.status!==200){
                  
                    noSessionHandler()
                }else{
                   return response.data.userId
                }
    }catch(error){
        console.error("check if logged in error: ", error)
       noSessionHandler()
    }
}

export const checkIfNotLoggedIn =async ()=>{
  try{
              const response = await axios.get(`http://localhost:8100/auth/verifySession`, {
                  withCredentials: true,
                  headers: {
                    "Accept": "application/json",
                  }
                })
               
                console.error('check if not logged in', response.status)
              if(response.status===200){
                  window.location.href = authPath;
               }
  }catch(error){
      console.error("check if not logged in error: ", error)
     
  }
}


export const logout = async ()=>{
  try{
      const response = axios.delete('http://localhost:8100/auth/logout', {withCredentials: true})
      window.location.href='/login'
                        localStorage.removeItem('401');
                  localStorage.removeItem('accountDeleted');
      window.localStorage.removeItem('unavailableDocument');
  }catch(error){
    console.error("logout error: ", error)
  }
}
import axios from "axios"
import Cookies from 'js-cookie';


const notAuthPath="/sessionExpired";
const authPath="/dashboard";

export const noSessionHandler = ()=>{
  localStorage.setItem('401', 'true')
  window.location.href = notAuthPath;
}

export const checkIfLoggedIn =async ()=>{
   

    

    try{
        // const authCookie = Cookies.get('auth');
              // if (authCookie === undefined || authCookie === null) {
              //   window.location.href = notAuthPath;
              // }else{
                //console.log(authCookie)
                const response = await axios.get(`http://localhost:8100/auth/verifySession`, {
                    withCredentials: true,
                    headers: {
                      "Accept": "application/json",
                    }
                  })
                  console.log("status dashboard: ", 200)
                if(response.status!==200){
                    window.location.href = notAuthPath;
                }else{
                   return response.data.userId
                }
             // }
    }catch(error){
        console.log("checkIfLoggedIn error: ", error)
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
                //console.log("status dashboard: ", 200)
              if(response.status===200){
                  window.location.href = authPath;
               }//else{
              //    return response.data.userId
              // }
           // }
  }catch(error){
      console.log("checkIfNotLoggedIn error: ", error)
      //console.log('Not loged in')
      //window.location.href = authPath;
  }
}


export const logout = async ()=>{
  try{
      const response = axios.delete('http://localhost:8100/auth/logout', {withCredentials: true})
      window.location.href='/login'
  }catch(error){
    console.log("error logout: ", error)
  }
}
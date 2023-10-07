import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
export const Appcontext = createContext({});
export const AppProvider = ({ children }) => {
          const [detail, setDetail] = useState(null); 
          useEffect(() => {
                    axios.get("http://localhost:8080/employee/all?page=0&sort=lastname",{
                      headers :{
                      'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem("token")).token
                      }
                    }).then(re => { setData(re.data.content);console.log(re) }).catch(re=>setIsLoggin(false))
                  },[])
          const [isLoggin, setIsLoggin] = useState(() => {
                    if (window.localStorage.getItem("token") !== null) return true;
                    return false;
          });
          return <Appcontext.Provider value={{detail,setDetail,isLoggin,setIsLoggin }}>
          {children}
</Appcontext.Provider>
}

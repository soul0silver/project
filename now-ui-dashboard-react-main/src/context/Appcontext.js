import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
export const Appcontext = createContext({});
export const AppProvider = ({ children }) => {
  const [detail, setDetail] = useState(null); 
  const [isLoggin, setIsLoggin] = useState(false);
  const [update, setUpdate] = useState(0);
  const [back, setBack] = useState();
  const [newGRn, setNew] = useState(false);          
          return <Appcontext.Provider value={{back, setBack,detail,setDetail,isLoggin,setIsLoggin,update, setUpdate,newGRn, setNew }}>
          {children}
</Appcontext.Provider>
}

import { useEffect, useState } from "react";
import {getActiveUser, type IUserModel } from "../LocalStorage";
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const [activeUser ,setActiveUser] = useState<IUserModel>();
    const navigate = useNavigate();
    useEffect(()=>{
      const data = getActiveUser();
      if(data == null){
       navigate("/login")
      }

      setActiveUser(data);
    },[])

    const handleLogout = () => {
   
     localStorage.removeItem("activeUser");
     localStorage.removeItem("token");
 
     
     navigate("/login");
  };
    return(
        <>
          <div style={{color:"white"}}>Welcome {activeUser?.name}</div>
          <button onClick={handleLogout}>Logout</button>
        </>
    )
}
export  default Home;


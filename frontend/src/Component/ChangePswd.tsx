import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Changepswd =()=>{
    const [newPassword , setNewPswd] =useState<string>("");
    const [checkpswd ,setChecpswd] =useState<string>("");
    const [message ,setMessage] = useState<string>("");
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const navigate = useNavigate()

    const handleInputChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value;
        setNewPswd(value);
        return
    }

    const checkPassword = (event :React.ChangeEvent<HTMLInputElement>)=>{
      const value = event.target.value;
      setChecpswd(value)
    }

    const handleSubmit =async (event:  React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const userId = localStorage.getItem("resetUserId");
        
        if(!newPassword){
            setMessage("Enter the password")
            return
        }else if(newPassword.length < 8 ){
           alert("Password should have minimum 8 digits.")
           return
        }else if(!hasSpecialChar.test(newPassword)){
            alert("Password must contain at least one special character" );
            return
        }else if(!checkpswd){
          alert("ReEnter password")
          return
        }else if(newPassword != checkpswd){
          alert("Your password is incorrect please recheck again.")
          return
        }

      try{  const res =await fetch("http://localhost:3000/changePassword",{
           method : "POST",
           headers :{"Content-Type" :"application/json"},
           body : JSON.stringify({password: newPassword,userId})
        })
        const result = await res.json();
        if(!res.ok){
            alert(result.message)
            return;
        }
        alert("Password Changed.")
        localStorage.removeItem("resetUserId")
        navigate("/login")
      }catch(error){
        console.error(error);
        alert("Server not responding");
      }

    }
    return(
        <>
         <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form onSubmit={handleSubmit}>
            <h3>Change Password</h3>
            <label>New Password</label>
            <input id="password" 
              type="text"
              placeholder="Enter new Password"
              value={newPassword}
              onChange={handleInputChange}
              />
            <label>Check Password</label>
            <input id="password"
             type="text"
             placeholder="Enter password for check"
             value={checkpswd}
             onChange={checkPassword}/>
            
            <button>Save</button>
            <div className="social">
             {message && <p style={{ color: "red" }}>{message}</p>}
              <Link to= "/login">Login</Link>
            </div>
        </form>
        </>
    )
}

export default Changepswd;
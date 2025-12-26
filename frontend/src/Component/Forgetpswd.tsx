import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Forgetpswd =()=>{
    const [email,setEmail]=useState<string>("");
    const navigate = useNavigate();
    const handleInputChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value;
        setEmail(value)
    }

    const handleSubmit= async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try{
            const res = await fetch("http://localhost:3000/forget",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: email})
            })
            const result = await res.json();
            if(!res.ok){
                alert(result.message);
                return
            }
            localStorage.setItem("resetUserId", result.userId);
            navigate("/changePassword")
        }catch (error) {
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
               <h3>Forget Password</h3>
               <label>Email</label>
               <input 
                 type="text"
                 placeholder="Enter an Email"
                 id="email"
                 value={email}
                 onChange={handleInputChange}/>
                
                <button>Send</button>
                <div className="social">
                    <Link to="/login">Back to Login</Link>
                </div>
           </form>
        </>
    );

}
export default Forgetpswd;
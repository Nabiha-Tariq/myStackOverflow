import { useState } from "react";
import {type IUserModel } from "../LocalStorage";
import { Link, useNavigate } from "react-router-dom";


const Register= ()=> {
    const [data, setData] =useState<IUserModel>(
        {name:"", email:"", password:""});
    
    const [checkpswd , setChecpswd] =useState<string>("")

    const [message , setMessage] =useState<string>("")
    const navigate = useNavigate();
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const handleInputChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
       const id= event.target.id;
       const value = event.target.value;
       setData({...data, [id]:value});
       setMessage("");
    }
  
    const checkPassword = (event :React.ChangeEvent<HTMLInputElement>)=>{
      const value = event.target.value;
      setChecpswd(value)
    }
    const handleFormSubmit= async (event: React.ChangeEvent<HTMLFormElement>)=>{
       event.preventDefault();

       if(data.name == ""){
        setMessage("Please enter the name")
         return;
       }

       if(data.email == ""){
        setMessage("Please enter the email")
        return;
       }else if(!emailPattern.test(data.email)){
        alert("Email is not valid.")
       }

       if(data.password == ""){
        setMessage("Please enter the password")
        return;
       }else if(data.password.length < 7){
        alert("Password should have minimum 8 digits.")
        return
       }else if (!hasSpecialChar.test(data.password)) {
        alert("Password must contain at least one special character" );
        return
       }else if(data.password != checkpswd){
        alert("Your password is incorrect please recheck again.")
        return 
       }

        const res = await fetch ("http://localhost:3000/register" ,{
          method: "POST",
          headers :{"Content-Type" :"application/json"},
          body : JSON.stringify({name : data.name,email : data.email ,password: data.password})
        } )

        const result = await res.json();
        if(!res.ok){
          setMessage(result.message)
          return;
        }else{
          setMessage("User registered successfully");
          setData({name:"",email:"",password:""})
          navigate("/login")
        }
    }
  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form  onSubmit={handleFormSubmit}>
        <h3>Register Here</h3>

          <label>Name</label>
          <input type='text' placeholder='Enter Name' id='name' value={data.name} onChange={handleInputChange}/>
      
          <label>Email</label>
          <input type='email' placeholder='Enter Email' id='email' value={data.email} onChange={handleInputChange}/>
      
          <label>Password</label>
          <input type="password" placeholder='Enter Password' id="password" value={data.password} onChange={handleInputChange}/>

          <label>Check Password</label>
          <input type="password" placeholder='Enter Password' id="password" value={checkpswd} onChange={checkPassword}/>
          
          <button>Register</button>
          <div className="social">
           {message && <p style={{ color: "red" }}>{message}</p>}
            <Link to= "/login">Login</Link>
          </div>
      </form>
    </>
  )
}

export default Register
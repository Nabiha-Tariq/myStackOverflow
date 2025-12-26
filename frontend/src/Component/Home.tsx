
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate = useNavigate();

    const handleGnrateQuest=()=>{
      navigate("/genrateQuestion")
    }

    const handleLogout = () => {
   
     localStorage.removeItem("activeUser");
     localStorage.removeItem("token");
     
     navigate("/login");
    };
    return(
        <>
           <div className="background">
             <div className="shape"></div>
             <div className="shape"></div>
           </div>
          <div className="Question_box">
            <h3>Welcome Home page</h3>
            <button onClick={handleGnrateQuest}>Generate Question</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
          
          
        </>
    )
}
export  default Home;


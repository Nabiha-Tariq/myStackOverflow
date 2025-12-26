import { useNavigate } from "react-router-dom";

const GenrateQuest=()=>{
    const navigate = useNavigate();
    const handleBtn = ()=>{
        navigate("/home")
    }
    return(
        <>
          <div className="Question_box">
              <h3>Genrate Question</h3>
              <label>Select Category</label>
              <select>
                <option disabled selected>None</option>
                <option>C++</option>
                <option>Python</option>
              </select>
              <label>Enter Question</label>
              <input type="text"
              placeholder="Write Question here"/>
              <button onClick={handleBtn}>Back to Home</button>
          </div>
        </>
    )
}
export default GenrateQuest;
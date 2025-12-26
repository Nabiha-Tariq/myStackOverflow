import express, { Request, response, Response } from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, testDBConnection } from "./db";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

testDBConnection();


if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in .env file");
  process.exit(1); // stop server if secret is missing
}

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my server");
});

app.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const values = [name, email, hashedPassword];
    const [result] = await db.query(sql, values);

    return res.json({
      message: "User registered successfully",
      userId: (result as any).insertId,
    });

  } catch (err: any) {
    console.error("Register error:", err.message);
    // Check for duplicate email
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Email is already registered" });
    }
    return res.status(500).json({ error: "Database insert error", details: err.message });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }


    const sql = "SELECT * FROM users WHERE email = ?";
    const [result] = await db.query(sql, [email]);
    const users = result as any[];

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password.toString(), user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
       process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    

    return res.json({
      message: "User login successful",
      token
    });
  } catch (error : any) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/forget", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const sql = "SELECT id, email FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    const users = rows as any[];

    if (users.length === 0) {
      return res.status(404).json({ message: "Email not registered" });
    }

    return res.status(200).json({
      message: "User found",
      userId: users[0].id,
    });

  } catch (err: any) {
    console.error("Forget password error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/changePassword", async(req: Request , res: Response)=>{
  try{
    const {password, userId} = req.body;

    if(!password|| !userId){
      return res.status(400).json({message :"Password required"})
    } 
    

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    const [rows] = await db.query(sql , [hashedPassword ,userId])
    const user = rows as any[];
    
    if (user.length === 0) {
      return res.status(404).json({ message: "User not Found " });
    }
    
    return res.status(200).json({
      message :"User's password updated successfully"
    })


  }catch (err: any) {
    console.error("Forget password error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

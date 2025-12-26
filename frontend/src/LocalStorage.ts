const REGISTERED_USERS = "registered_users"
const ACTIVE_USERS = "active_user";

export interface IUserModel{
    name: string;
    email: string;
    password: string;
}

const addNewUser =(user: IUserModel)=>{
   const  userStr = localStorage.getItem(REGISTERED_USERS) || "[]"
   const users = JSON.parse(userStr) as IUserModel[];
   users.push(user);
   localStorage.setItem(REGISTERED_USERS, JSON.stringify(users))
}

const isUserAlreadyRegisterd = (email : string)=>{
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if(userStr == null)
        return false;

    const users = JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find(x => x.email == email);
    return foundUser != null;
};

const getUser = (email : string, password: string)=>{
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if(userStr == null)
        return null;
    
    const users =JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find((x)=> x.email==email && x.password == password);
    return foundUser;
}

const updateActiveUser =(user: IUserModel)=>{
    localStorage.setItem(ACTIVE_USERS, JSON.stringify(user));
}

const getActiveUser = () => {
  const user = localStorage.getItem("activeUser");
  if (!user) return null;
  try {
    return JSON.parse(user); // ✅ parse JSON string
  } catch (err) {
    console.error("Failed to parse activeUser from localStorage", err);
    return null;
  }
};

const deleteActiveUser = () =>{
    localStorage.removeItem(ACTIVE_USERS)
}
export {addNewUser , isUserAlreadyRegisterd , getUser , updateActiveUser, getActiveUser ,deleteActiveUser};
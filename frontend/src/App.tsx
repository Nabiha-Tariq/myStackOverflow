import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
import { getActiveUser } from './LocalStorage';
import Forgetpswd from './Component/Forgetpswd';
import Changepswd from './Component/ChangePswd';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forgetpswd />} />
        <Route path="/changePassword" element={<Changepswd/>}/>

    
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Home />} /> {/* default child */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const PrivateRoute = () => {
  const activeUser = getActiveUser();
  console.log("Active User:",activeUser)
  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // renders child route (Home)
};

export default App;

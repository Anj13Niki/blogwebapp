import {Routes,Route,useNavigate, Navigate, useParams} from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Detail from './pages/Detail';
import AddorUpdate from './pages/AddorUpdate';
import About from './pages/About';
import Header from './component/Header';
import NotFound from "./pages/NotFound"
import Auth from './pages/Auth';
import { useEffect, useState } from 'react';
import  {auth} from './firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import './App.css'
import './media query.css'

function App() {
  const[active,setActive] = useState("home");
  const [user,setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }
      else{
        setUser(null);
      }
    });
  },[]);


  const handleLogout=()=>{
    signOut(auth).then(()=>{
      setUser(null);
      setActive("login");
      navigate("/auth");
    })
  }
  return (
    <div className="App">
        <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout}/>
        <ToastContainer position='top-center'/>
        <Routes>
          <Route path='/' element={<Home setActive={setActive} user={user}/>}/>
          <Route path='/detail/:id' element={<Detail setActive={setActive}/>}/>
          <Route path='/create' element={user?.uid?<AddorUpdate user={user}/>:<Navigate to="/"/>}/>
          <Route path='/update/:id' element={user?.uid?<AddorUpdate user={user} setActive={setActive}/>:<Navigate to="/"/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/auth' element={<Auth setActive={setActive}/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    
    </div>
  );
}

export default App;

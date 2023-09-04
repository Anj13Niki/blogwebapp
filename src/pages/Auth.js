import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
const initialize = {
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  confirmPassword:""
}

const Auth = ({setActive}) => {
  const[state,setState] = useState(initialize);
  const[signup ,setSignUp] = useState(false);
  const{firstname,lastname,email,password,confirmPassword} = state;
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setState({...state,[e.target.name]:e.target.value});
  }

  const handleAuth = async(e)=>{
    e.preventDefault();
    if(!signup){
      if(email && password){
        await signInWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
          toast.success("Login successfully!!!")
          setActive("home");
        })
        .catch((error)=>{
          const errorCode = error.code;
          
          if(error.message == "Firebase: Error (auth/invalid-email)."){
              toast.error('Please fill all the required fields.');
          }
          if(error.message == "Firebase: Error (auth/user-not-found)."){
              toast.error('Email not found.');
          }
          if(error.message == "Firebase: Error (auth/wrong-password)."){
              toast.error('Wrong Password');
          }
      })
      }
      else{
        return toast.error("Please fill all the required fields!!!")
      }
      
    }
    else{
      if(password!==confirmPassword){
        return toast.error("Password don't get match!!")
      }
      if(firstname && lastname && email && password){
        const {user}= await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(user,{displayName:`${firstname} ${lastname}`});
        setActive("home");
      }
      else{
        return toast.error("All fields are neccessary!!!")
      }
    }
    navigate("/");
  }
  return (
    <div className='container-fluid mb-4 back'>
      <div className='container'>
        <div className='col-12 text-center'>
          <div className='text-center heading py-3'>
            {!signup?"Sign-In":"Sign-Up"}
          </div>
        </div>
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-lg-6'>
            <form className='row' onSubmit={handleAuth}>
              <div className='row'>
                {signup && (
                  <>
                  <div className='col-6 py-3'>
                  <input type='text' className='form-control input-text-box' autoComplete='off' placeholder='Enter your firstname...' name='firstname' value={firstname} onChange={handleChange}/>
                </div>
                <div className='col-6 py-3'>
                  <input type='lastname' className='form-control input-text-box' autoComplete='off' placeholder='Enter your lastname...' name='lastname' value={lastname} onChange={handleChange}/>
                </div>
                  </>
                )}
                <div className='col-12 py-3'>
                  <input type='email' className='form-control input-text-box' autoComplete='off' placeholder='Enter your email...' name='email' value={email} onChange={handleChange}/>
                </div>
                <div className='col-12 py-3'>
                  <input type='password' className='form-control input-text-box' autoComplete='off' placeholder='Enter your password...' name='password' value={password} onChange={handleChange}/>
                </div>
                {signup && (
                  <>
                  <div className='col-12 py-3'>
                  <input type='confirmPassword' className='form-control input-text-box' autoComplete='off' placeholder='Please enter your password again...' name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
                </div>
                  </>
                )}
                <div className='col-12 py-3 text-center'>
                  <button className={`btn ${!signup?"btn-sign-in":"btn-sign-up"}`}>
                    {!signup?"Sign-In":"Sign-Up"}
                  </button>
                </div>
              </div>
            </form>
            <div>
              {!signup?(
               <>
                <div className='text-center justify-content-center mt-2 pt-2'>
                  <p className='email fw-bold mt-2 pt-1 mb-0'>
                    Don't have an account? &nbsp;
                    <span className='link-danger' style={{textDecoration:"none",cursor:"pointer"}} onClick={()=>setSignUp(true)}>
                      Sign Up
                    </span>
                  </p>
                </div>
               </>
              ):(
                <>
                <div className='text-center justify-content-center mt-2 pt-2'>
                  <p className='email fw-bold mt-2 pt-1 mb-0'>
                    Already have an account?&nbsp;
                    <span className='link-success' style={{textDecoration:"none",cursor:"pointer",color:"#298af2"}} onClick={()=>setSignUp(false)}>
                      Sign In
                    </span>
                  </p>
                </div>
               </>
              )}
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export default Auth

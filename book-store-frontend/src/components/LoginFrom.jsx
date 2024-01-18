import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaArrowLeftLong } from "react-icons/fa6";

import { SERVER_URL } from '../assets/constants';
import { userActions } from '../store/user-slice';

const LoginForm = (props) => {
  const { setSignupFormVisible } = props;
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const loginButton = useRef(null);

  useEffect(() => {
    if (usernameInput.current)
      usernameInput.current.focus();
  },[])

  const handleLogin = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const creds = { username, password };
      const endpoint = SERVER_URL + '/users/login';
      const res = await axios.post(endpoint, creds);
      const userDetails = res.data;
      dispatch(userActions.setUser(userDetails));
      navigate('/')
    } catch(err) {
      const errMsg = err?.response?.data?.message ? err.response.data.message : err.message;
      console.log(err);
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const showSignupForm = () => {
    setSignupFormVisible(true);
  }

 
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <h1 className="text-4xl mb-4 font-semibold">Login</h1>

      <form className="flex flex-col" onSubmit={handleLogin}>
        {/* USERNAME */}
        <label htmlFor="username"
          className="font-bold m-2">Username</label>
        <input type="text" ref={usernameInput} id="username" value={username} placeholder="" autoComplete="off"
          onChange={e => setUsername(e.target.value.trim())}
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400"/>
        
        {/* PASSWORD */}
        <label htmlFor="password"
          className="font-bold mt-3 ml-2 mb-2">Password</label>
        <input type="password" id="password" placeholder="" value={password}
          onChange={e => setPassword(e.target.value)}
          className="outline-none border-2 px-4 py-2 rounded-full w-96 focus:border-violet-400" />
        
        {/* LOGIN */}
        <button
          className="w-96 rounded-full text-white bg-violet-800 hover:bg-violet-900 duration-200 p-3 my-4 mt-6 font-semibold"
          disabled={isLoading} ref={loginButton}
        >
          {!isLoading && <span>Login</span>} {isLoading && <HiOutlineDotsHorizontal className="inline animate-ping"/>}
        </button>
      </form>
        
      {/* OR */}
      <div className="relative flex justify-center flex-col items-center w-96">
        <div className="inline-block absolute w-full border top-3 z-0"></div>
        <div className="bg-white z-10 px-3 text-slate-400">or</div>
      </div>
      

      {/* CREATE ACCOUNT */}
      
      <div className="mt-2 ml-2 w-96">
        <span
          className="font-semibold">Not registered yet?</span>
        <span onClick={showSignupForm}
          className="ml-2 font-bold text-violet-800 cursor-pointer">
          Create an Account</span>
      </div>
    </div>
  )
}

export default LoginForm;
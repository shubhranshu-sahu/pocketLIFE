import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useCookies } from "react-cookie";

function AuthButton() {
    const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);

    const login = useGoogleLogin({
      onSuccess: tokenResponse => {
        console.log(tokenResponse)
        axios.get(`http://localhost:3000/auth?code=${tokenResponse['access_token']}`).then((res)=>{
          console.log(res.data);
          setCookies('access_token', res.data.token);
          localStorage.setItem('username', res.data.user.name)
          localStorage.setItem('email', res.data.user.email)
          localStorage.setItem('image', res.data.user.image)
        }).catch((err)=>{
          console.error(err);
        })
      },
    });
  
  
    const loggedIN = <div>
      <h1>User Logged IN</h1>
      <h3>{localStorage.getItem('username')}</h3>
      <h3>{localStorage.getItem('email')}</h3>
      <img width={100} height={100} src={localStorage.getItem('image') || ''} alt="" />
      <br />
      <button onClick={()=>removeCookie('access_token')}>Log Out</button>
    </div>
    return (
      <div>
        {cookies.access_token ? loggedIN : <button onClick={()=>login()}>My Google</button> }
    </div>
    )
}

export default AuthButton
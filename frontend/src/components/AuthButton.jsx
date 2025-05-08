import React,{useRef} from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function AuthButton() {
    const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const menuRight = useRef(null);
    const items = [
      {
          label: 'Options',
          items: [
              {
                label: 'Log Out',
                style: {'fontSize':"12px"},
                icon: 'pi pi-sign-out',
                command(event) {
                    event.originalEvent.type === 'click' && removeCookie("access_token")
                    window.location.reload();
                },
              },
          ]
      }
  ];

    const login = useGoogleLogin({
      onSuccess: tokenResponse => {
        console.log(tokenResponse)
        axios.get(`http://localhost:3000/auth?code=${tokenResponse['access_token']}`).then((res)=>{
          console.log(res.data);
          setCookies('access_token', res.data.token);
          localStorage.setItem('username', res.data.user.name)
          localStorage.setItem('email', res.data.user.email)
          localStorage.setItem('image', res.data.user.image)
          navigate('/')
        }).catch((err)=>{
          console.error(err);
        })
      },
    });
  
    const loggedIN = <div>
      <img onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup style={{borderRadius:'100%'}} width={50} height={50} src={localStorage.getItem('image') || ''} alt="" />
      <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
      {/* <Button label="Show Right" icon="pi pi-align-right" className="mr-2" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup /> */}
      {/* <button onClick={()=>removeCookie('access_token')}>Log Out</button> */}
    </div>
    return (
      <div>
        {cookies.access_token ? loggedIN : <Button severity='secondary' icon='pi pi-sign-in' outlined onClick={()=>login()} label='Login/Enter'/> }
    </div>
    )
}

export default AuthButton
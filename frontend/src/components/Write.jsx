import React, {useEffect, useState, useRef} from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';

function Write() {
    const [cookies, _] = useCookies(["access_token"]);
    const [titleVal, setTitleVal] = useState('The End of An Era');
    const [descVal, setDescVal] = useState('The End of An Era');
    const [imageVal, setImage] = useState("https://images.stockcake.com/public/f/6/2/f6200ac6-9e40-4081-a36d-51b45ead18c4_large/antique-journal-collection-stockcake.jpg");
    let { date } = useParams();
    const toast = useRef(null);

    const show = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
    };

    useEffect(()=>{
        axios.get(`http://localhost:3000/date?date=${date}`, {
            headers:{
                'Authorization': cookies.access_token
            }
        }).then((res)=>{
            console.log(res)
            const {title, content, image, mood} = (res.data);
            setTitleVal(title);
            setDescVal(content);
            setImage(image);
        }).catch((err)=>{
            console.log("no entry")
        })
    },[])


    // date = new Date(date);
    function handleUpdate(){
        axios.post('http://localhost:3000/date',{
            title: titleVal,
            content: descVal,
            image: 'https://i.pinimg.com/736x/24/66/a1/2466a17b21e6371ebc7a83ee36f6150e.jpg',
            mood: 'green',
            date: date
        },
        {
            headers:{
                'Authorization': cookies.access_token
            }
         }).then((res)=>{
            console.log(res);
            show()
        }).catch(err=>{
            console.error(err);
        })
    }

  return (
    <>
    <Toast ref={toast} />
    {/* <Button onClick={show} label="Show" /> */}

    <div className="container" style={{flexDirection:'column'}}>
      <h1>{new Date(date).toDateString()} Entry</h1>
      <InputText style={{width:'100%'}} value={titleVal} onChange={(e) => setTitleVal(e.target.value)} />
    </div>
    <br />
    <div className="container">
      <div style={{ height:'30rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', border:'1px dashed'}}>
          <img src={imageVal} style={{objectFit:'cover', height:'100%'}} width={300} alt=""/>
      </div>
      <div style={{maxWidth:'700px',flex:1, marginLeft:'2rem'}}>
        <InputTextarea value={descVal} onChange={(e) => setDescVal(e.target.value)} style={{width:'100%' , height:'30rem', resize:'none'}} rows={20}/>
        <br /><br />    
        <div style={{width:'100%', display:'flex'}}>
            <Button onClick={handleUpdate} style={{marginLeft: 'auto'}} label="Success" severity="success" />
        </div>
      </div>
    </div>
    </>
  )
}

export default Write
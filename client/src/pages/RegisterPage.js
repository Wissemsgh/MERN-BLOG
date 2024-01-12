import {useState} from "react";
import axios from 'axios'
export default function RegisterPage (){

    const [username , setUsername]= useState("");
    const [password, setPassword]= useState("");
    console.log(username,password)
    const register= async()=> {
        
      
        const response = await axios.post('http://localhost:4000/register',{username,password})
        console.log(response)
        if (response.status === 200) {
         return alert ('registration successful');
          
        } else {
         return alert ('registration failed');
        }
      
      }
      



    return (
        <>
        <h1>Register</h1>
        <input type="text" 
        placeholder="username" 
        value={username}
        onChange={ev => setUsername(ev.target.value)}/>

        <input type="password" 
        placeholder="password" 
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        />
        <button onClick={register}>Register</button>
        </>
    )
}
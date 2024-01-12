import { useContext, useState } from "react"
import   {Navigate} from "react-router-dom"
import { UserContext } from "../UserContext";
import axios from 'axios';

export default function LoginPage() {
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [redirect,setRedirect]= useState(false);
    const {setUserInfo}= useContext(UserContext);

    const login = async ()=>{
        try {
            const response = await axios.post('http://localhost:4000/login',{username,password})
            console.log("hhhhhh",response)
            if (response.status===200){
        
                setUserInfo(response.data);
                setRedirect(true);
            }
            
     
    } catch(error){ 
       
        if (error.response.status === 400) {
            alert('Invalid credentials. Please check your username or password.');
          } 
    }

}


  
    if (redirect){
        return <Navigate to={'/'}/>
    }

    return(
        <>
          <h1>Login</h1>
        <input type="text" placeholder="username" value={username} 
        onChange={ev => setUsername(ev.target.value)} />
        <input type="password" placeholder="password"  value={password}
        onChange={ev => setPassword(ev.target.value)}/>
        <button onClick={login}>Login</button>
        </>
      
    )
}
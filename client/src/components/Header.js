import { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from 'axios';

export default function Header (){

  const{setUserInfo , userInfo}= useContext (UserContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:4000/profile', {
  //     withCredentials: true 
  //   })
  //   .then(response => {
  //     setUserInfo(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching profile:', error);
      
  //   });
  // }, []);
  

  

  const logout = async()=>{

    const response = await axios.post('http://localhost:4000/logout',setUserInfo(null))

  }
  

    const username= userInfo?.username;

    return (
        <header className="header">
        <Link to="/" className="logo"> Floyd</Link>
        <nav>
          {username && (
            <>
            <Link to="/create"> Create new post</Link>
            <Link onClick={logout}>Logout</Link>
            </>
          )}
          {!username && (
            <>
             <Link to="login">Login</Link>
          <Link to="register">Register</Link>

            </>

          )}
         
        </nav>
      </header>
    )
}
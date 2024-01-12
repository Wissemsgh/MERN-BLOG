import Post from "../components/Post";
import setBodyColor from "../components/Bodycolor";
import   {useEffect, useState} from 'react'
import axios from 'axios'
import Footer from "../components/Footer";

export default function HomePage (){
    setBodyColor({color: "#ffffff"})


        const [posts, setPosts] = useState([]);
        useEffect(() => {
          axios.get('http://localhost:4000/post') 
            .then(response => {
            console.log("post",response.data)
              setPosts(response.data);
            })
            
        }, []);
        

console.log('posts',posts)
    return(
        <>
        {posts.length > 0 && posts.map(post => {
    return (
    <Post key={post._id} {...post} />

    )        
    })}
 
      

        <Footer/>
        </>

    )
}
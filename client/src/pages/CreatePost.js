import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Editor from "../components/Editor";



export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [files, setFiles] = useState("");
  const [redirect , setRedirect]= useState("");

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhaGEiLCJpZCI6IjY1OTI5Y2Q5ZjYyYTY1MzQ4YmVhYzYyZSIsImlhdCI6MTcwNDY3NjA3MH0.BmJwSRcypXBufBA1GlUOiEWB619s4ta2G1ZjXd4qeX0'; // Replace with your actual token
  console.log('daaaata',files)

    async function createNewPost (){
      const data = new FormData();
    data.set('title',title);
    data.set('summary',summary);
    data.set('content',content);
    data.append('file', files && files[0]);
    // data.set('file', files[0]);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${token}`, 
      },
    };
    
    try {
      const response = await axios.post('http://localhost:4000/post', data, config);
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error creating new post:', error);
    }
    }
    

    // const createNewPost = async ()=>{
    //   const response = await axios.post('http://localhost:4000/post',data)
    //   if (response.status===200) {
    //     setRedirect(true)
    //   }
    // }
    
    
  
  if (redirect) {
    return <Navigate to ={'/'} />
    
  }

  return (
    <>
    <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      {/* <input
        type="author"
        placeholder={"Author"}
        value={author}
        onChange={(ev) => setAuthor(ev.target.value)}
      /> */}
      <input type="file" accept="image/*" onChange={(ev)=> setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button onClick={createNewPost} style={{ marginTop: "5px" }}>Create post</button>
    
    </>
      
  );
}

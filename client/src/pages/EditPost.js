import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";
export default function EditPost () {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect , setRedirect]= useState("");

    useEffect(() => {
      axios.get(`http://localhost:4000/post/${id}`)
        .then(response => {
          const postInfo = response.data;
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        })
        .catch(error => {
          // Handle error here
          console.error('Error fetching data:', error);
        });
    }, []);
console.log('title',title)

    async function updatePost() {
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id',id);
      data.append('file', files && files[0]);

      console.log('daaaata',data)

      // data.set('file', files?.[0]);
    
      try {
        const response = await axios.put('http://localhost:4000/post/update', data ,{
});
    
        if (response.status === 200) {
          setRedirect(true);
        }
      } catch (error) {
      
        console.error('Error updating post:', error);
      }
    }

    if (redirect) {
        return <Navigate to ={'/post/' + id} />
        
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
         
          <input type="file"  onChange={(ev)=> setFiles(ev.target.files)} />
          <Editor onChange= {setContent} value={content} />
          <button onClick={updatePost} style={{ marginTop: "5px" }}>Update Post</button>
        
        </>
          
      );
}
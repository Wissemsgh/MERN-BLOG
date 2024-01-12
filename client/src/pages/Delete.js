export default function DeletePost(){
    const deletePost = async () => {
        try {
          const response = await axios.delete('http://localhost:4000/post/123'); 
          if (response.status === 200) {
            console.log('Post deleted successfully');
          } else {
            console.error('Failed to delete post. Server returned:', response.status, response.data);
          }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };
    
      if (redirect) {
        return <Navigate to={'/'} />;
      }
    return (
        <button onClick={deletePost} style={{ marginTop: "5px" }}>Delete post</button>

    )
}
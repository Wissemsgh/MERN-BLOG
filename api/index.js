const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require ('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require ('multer');
const uploadMiddleware = multer ({dest: 'uploads/'}); 
const fs = require ('fs');
 
 


const app = express()
const salt = bcrypt.genSaltSync(10);
const secret = 'lfhgdghlsoq' ;
   
app.use(cors({origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
mongoose.connect('mongodb+srv://blog1:LafD0zppncKQD7gT@cluster0.ulx2a4j.mongodb.net/?retryWrites=true&w=majority')
    
app.post('/register' ,async (req,res)=>{
  const {username,password}= req.body;

  try {
    const userDoc =  new User({
      username ,
      password:bcrypt.hashSync (password,salt) });
      await userDoc.save()
    res.status(200).send(userDoc); 


  } catch (error) {
    res.status(400).json(error);
  }
})
 
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  if (userDoc) {
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);

    if (isPasswordValid) {
      jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
          console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet tokeen',token) 
        if (err) {
          console.error('Error creating JWT:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.cookie('token', token , { httpOnly: true }).json({
            id: userDoc._id,
            username,
          });
        }
      });
    } else {
      res.status(400).json({ error: 'Wrong password' });
    }
  } else {
    
    res.status(400).json({ error: 'User not found' });
  }
});   

app.get ('/profile' , (req,res)=>{
  const {token} = req.cookies ;

  jwt.verify(token , secret , {} , (err,info)=>{
    if (err) throw err;
    res.json(info);
  });
});
 
app.post ('/logout' , (req,res)=>{
  res.cookie('token', '' ).json('ok')

});

// app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
//   const { originalname, path } = req.file;
//   const parts = originalname.split('.');
//   const ext = parts[parts.length - 1];
//   const newPath = path + '.' + ext;
//   fs.renameSync(path, newPath);

//   console.log("req.cookies", req.cookies);

//   const { token } = req.cookies;
//   console.log("tokeeeeeeeeeeeeeeeeeen", token); 

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
  
//   jwt.verify(token, secret, {}, async (err, info) => {
//     if (err) {

//       console.error("JWT Verification Error:", err);
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const { title, summary, content } = req.body;

//     const postDoc = await Post.create({
//       title,
//       summary,
//       content,
//       cover: newPath,
//       author: info.id
//     });

//     res.json(postDoc);
//   });
// }); 

app.post ('/post', uploadMiddleware.single('file'), async (req,res)=>{  
  // console.log('reeeeeeq',req)
const {originalname , path}= req.file ;
const parts = originalname.split ('.');
const ext = parts[parts.length-1]; 
const newPath = path +'.'+ ext ;
fs.renameSync(path , newPath);

const token = req.headers.authorization;
console.log("tokeeeeeeeeeeeeeeeeeen", token)  
   
const {id} =  jwt.verify(token , secret) 
console.log('iiiiiiiiiiiid',id) 

    const {title , summary , content} = req.body ; 
  
    const postDoc = await Post.create ({
    title ,
    summary ,
    content , 
    cover : newPath ,
    author : id 
    
  }); 
  res.json(postDoc); 
      
  });
    

 
app.put ('/post/update', uploadMiddleware.single('file') ,async (req,res)=> {
  console.log('reeeeeq',req.file)
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }
      
   
  const{id , title , summary , content} = req.body;  
  console.log('boooody',req.body)
    const postDoc = await Post.findByIdAndUpdate(id,{$set:{   
      title , 
      summary ,
      content , 
      cover : newPath ? newPath : postDoc.cover ,
    
    }});
    console.log('pooooost',postDoc) 
      
    res.json(postDoc);
  
       
}) 
     
app.get('/post' ,async (req,res)=>{
  res.json(await Post.find().populate('author',['username']).sort({createdAt : -1}).limit(20)
  
  ) 
})        
      
 
app.get('/post/:id', async (req,res)=>{
  const {id} = req.params ;
  const postDoc =await Post.findById(id).populate('author', ['username'] );
  res.json(postDoc)
})
  
app.delete('/post/:id', async (req, res) => {
  const postId = req.params.id;
 
  try {
    
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      
      return res.status(404).json({ message: `Post with ID ${postId} not found` });
    } 

    
    console.log(`Post with ID ${postId} deleted successfully`);
 
      
    res.status(200).json({ message: `Post with ID ${postId} deleted successfully` });
  } catch (error) { 
        
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(4000,console.log("server is running"))
    
//LafD0zppncKQD7gT
//mongodb+srv://blog1:LafD0zppncKQD7gT@cluster0.ulx2a4j.mongodb.net/?retryWrites=true&w=majority  
const db=require('./db_connect');
const express =require('express');
const bluebird= require('bluebird');
const core =require('cors');
const session = require('express-session');
var cookieParser = require("cookie-parser");
const body =require('body-parser');
const bcrypt =require('bcrypt');
const { response } = require('express');
const { readData } = require('./db_connect');
const { password } = require('./db_config');
const app =express();

/**
 * Middle Wares
 */
app.use(cookieParser());
app.use(core());
app.use(express.json());
app.use(body.urlencoded({extended:true}))
let redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        next();}
};

let redirectHome = (req,res,next)=>{
    if(req.session.userId){
        res.redirect('/home');
    }
    else{
        next();}
};



/** SESSION */
app.use(session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: `quiet, pal! it's a secret!`,

    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production'
    }
  })
)

/** GET Requests*/
app.get('/',redirectHome,(req,res)=>{
    const {userId} = req.session;
    res.send(`
    
    ${userId ? `
    <h1>Welcoe to Home PAge</h1><br/><a href='/home'>Home</a>
    <form method='post' action ='/logout'>
        <button>Logout</button>
    </form>` :
    `<a href='/login'>Login</a><br/>
    <a href='/signup'>Register</a><br/>`}    
    `);
});

app.get('/home',redirectLogin,(req,res)=>{
    res.send(`
    <h1>HOME PAGE</h1>
    <a href='/'>main</a>
    <ul>
        <li>name : </li>
        <li>Email : </li>
    </ul>
    <form method='post' action ='/logout'>
        <button>Logout</button>
    </form>
    `)
});

app.get('/login',redirectHome,(req,res)=>{
   
    res.send(`<h1>Login</h1>

    <form method="POST" action="/login">
        <input type="text" name="username" placeholder="username" required>
        <input type="password" name="password" placeholder="password" required>
        <input type="submit">
    </form>
    <a href="/signup">Register</a>
    `)
})

app.get('/signup',redirectHome,async (req,res)=>{
    res.send(`<h1>Register Here</h1>

    <form method="post" action="/signup">

        <input type="text" name="Username" placeholder="name" required>
        <input type="text" name="emailID" placeholder="Email" required>
        <input type="password" name="User_Pass" placeholder="password" required>
        <input type="submit">
    </form>
    <a href="/login">Already</a>
    `)
})

app.get('/game',redirectHome,(req,res)=>{
   
    res.json({
        res: 200,
        read:'game'
    })
})

app.get('/forgot',(req,res)=>{
   
    res.send(`
    <form method="POST" action="/forgot">
    <input type="text" name="emailID" placeholder="Email" required>
    <input type="password" name="password" placeholder="password" required>
    <input type="submit">
</form>

    `)
})

/**  POST Request
 * more@gmail.com
 */

app.post('/login',redirectHome,async(req,res)=>{
    let user =req.body;
    console.log(user);

db.readData(user).then(response=>{
         let user_email=  response[0].emailID;
     let user_User_Pass = response[0].User_Pass;
     let user_session_ID = response[0].id;

     
     if(user.email===user_email && user.password===user_User_Pass){
        req.session.userId=user_session_ID;
        console.log( req.session.userId);
         res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
}).catch(err=>{
    console.log(err);
});
})

app.post('/signup',redirectHome,async(req,res)=>{
    var result1;
    let user_session_ID
    let user =req.body;
    console.log(user);

  let result=await db.countData().then(async result1=>{result1= result1[0].total
    let new_data= await db.insertData(user);
    req.session.userId=result1+1;
     res.redirect('/game');
}).catch(err=>console.log(err));

}); 


app.post('/forgot',async(req,res)=>{
    let emailID =req.body.emailID;
    let password =req.body.password;
    let user ={
        emailID,
        password,
    }
    console.log(user);
let result =await db.updateData(user);
        
        res.redirect('/login');
        console.log('Update Succesfully');
});

app.post('/logout',redirectLogin,(req,res)=>{
   req.session.destroy((err)=>{
       if(err){
           return res.redirect('/home');
       }
       res.clearCookie('sid');
       res.redirect('/login');
   })
})

app.listen(5600,(err)=>{
    if(err) throw err;
    console.log("Port is listening on port 5600");
});

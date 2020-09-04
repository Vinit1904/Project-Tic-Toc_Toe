const db_config=require('./db_config');
const mysql =require('mysql');
const promise=require('bluebird');
const { json } = require('express');

const { user } = require('./db_config');

promise.promisifyAll(require('mysql/lib/Connection').prototype);
promise.promisifyAll(require('mysql/lib/pool').prototype);

let readData = async (user)=>{
    const connection=mysql.createConnection(db_config); 
    
   await connection.connectAsync();
    let my_Query=`select * from Signup where emailID =?`;
   let result =await connection.queryAsync(my_Query,[user.email]);
   if(result===undefined){
      return 'False';
   }
   await connection.endAsync();
    console.log('Read data end'); 
   return result;
};

let readDataF = async (user)=>{
   const connection=mysql.createConnection(db_config); 
   
  await connection.connectAsync();
   let my_Query=`select * from Signup where emailID =?`;
  let result =await connection.queryAsync(my_Query,[user.emailID]);
  if(result===undefined){
     return 'False';
  }
  await connection.endAsync();
   console.log('Read data end'); 
  return result;
};

/**
 * id
 * Username 20
 * Email 50
 * Password 20
 * score int
 */
let countData=async()=>{
  const connection=mysql.createConnection(db_config); 
    
   await connection.connectAsync();
    let my_Query=`select count(*) as total from Signup`;
   let result =await connection.queryAsync(my_Query);

   await connection.endAsync(); 
   return result;
}

let insertData = async (user)=>{
    const connection=mysql.createConnection(db_config); 
    
   await connection.connectAsync();
    let my_Query='insert into Signup(emailID,User_Pass,Username) values (?,?,?)';
   let result =await connection.queryAsync(my_Query,[user.email,user.password,user.username]);
   await connection.endAsync();
   console.log('Insert end ');
   return result;
}

let updateData = async (user)=>{
   const connection=mysql.createConnection(db_config); 
   console.log(user);
  await connection.connectAsync();
   let my_Query=`update Signup set User_pass=? where emailID=?;`;
  let result =await connection.queryAsync(my_Query,[user.password,user.emailID]);
  await connection.endAsync();
  console.log('Update end ');
  return result;
}


module.exports= {readData,insertData,countData,updateData,readDataF};





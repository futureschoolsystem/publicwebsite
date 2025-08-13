// src/lib/mongodb.js
import mongoose from 'mongoose';

export  function connect(){
  mongoose
  .connect(process.env.MONGODB_URI ,{
    tls:true,
  })
  .then(()=>{
    console.log("Database Connected")
  })
  .catch((error)=>{
    console.log("There is an error while connecting Mongodb",error)
  })
} 
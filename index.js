// const fs = require("fs");
// const { mkdir } = require("fs/promises");
// const http = require('http');
// const os = require('os');
// const crypto = require("crypto");
// console.log(os.platform());
// console.log(os.cpus());
// console.log(os.tmpdir());
// console.log(os.uptime())
// console.log(os.userInfo());

// const hashvalue = crypto.createHash("sha512").update("saurabh").digest("hex");
// console.log(hashvalue);


// console.log(crypto.getHashes())
// const server = http.createServer((req,res)=>{
//     console.log(req.socket.remoteAddress);
//     console.log(req.headers);
//     console.log(req.url);
//     res.end("data received");
// })


// server.listen("8888",()=>{
//     console.log("succesfully server started");
// })



// (async function(path){
//     try{
//         await unlink(path);
//         console.log("file deleted");
//     }catch(error){
//         console.log("something error accured");
//     }
// })("a.txt");
// let path = "a.txts"
// fs.unlink(path,(err)=>{
//     if(err) throw err;
//     console.log("file deleted");
// })
// using try and catch you handle error 
// fs.unlinkSync(path);

// mkdir("saurabh/b",{recursive:true}).then(()=>{
//     console.log("created successfully");
// }).catch(()=>{
//     console.log("error");
// })
// function createRandomFile(place){
//     let fname = Math.floor(Math.random()*100)+Date.now();
//     let data = "hello how are you";
//     fs.writeFile(`${place}/${fname}.txt`,data,"utf-8",(err)=>{
//         if(err) throw err;
//         console.log(`${fname} file created successfully....`)
//     })
// }
// try{
//     const status = fs.statSync("books");
//     createRandomFile("books")       
//     // console.log(status);
// }catch(err){
//     fs.mkdir("books",{recursive:true},(err)=>{
//                 if(err) throw err;
//                 createRandomFile("books")
//             })
//     // console.log("error"+err)
// }
// if(status.isDirectory()){
//     fs.mkdir("books",{recursive:true},(err)=>{
//         if(err) throw err;
//         createRandomFile("books")
//     })
// }else{
//     createRandomFile("books")
// }

// fs.readdir("books",{recursive:true},(err,files)=>{
//     if(err) throw err;

//     // console.log(files);
//     files.forEach((e,i)=>{
//         fs.readFile(`books/${e}`,"utf-8",(err,data)=>{
//             console.log(`file ${i} : ${data}`)
//         })
//     })

// })
// fs.rename("a.txt","saurabh/b.txt",(err,data)=>{

// }


const Router = require("./routes/routes")
const express = require("express");
const http = require("http");
const connectDB = require("./connection")
const app = express();
const {middleware} = require("./middleware/middleware")
//database connection
connectDB().then(()=>{
    console.log('database connected successfully');
}).catch((err)=>{
    console.log("databse not connected have some issue"+err);
})

//define middlreware
//app.use(middleware);
app.use(express.urlencoded({extended:true}))

//routes config
app.use("/api/users",Router);



//server started
http.createServer(app).listen("7000",()=>{
    console.log("server started");
});


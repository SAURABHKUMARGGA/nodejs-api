const express = require("express");
const Router = express.Router();
const fs = require('fs');

let users="";

fs.readFile("./users.json","utf-8",async (err,data)=>{
    if(err) throw err;
   users = await JSON.parse(data);
//    console.log(users);
})

Router.get("/api/users",(req,res)=>{
    console.log(users);
    res.json(users);
})
Router.post("/api/create",(req,res)=>{
    let userData ={...req.body, "id": users.length};
    users.push(userData);
    fs.appendFile("./users.json",users,"utf-8",(err,data)=>{
        if(err){
            res.json({"status":"not ok"});
            throw err;
        };

        res.json({"status":"ok"})
    })
})


module.exports = Router;
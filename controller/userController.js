//const fs = require('fs');

// let users="";

// fs.readFile("./users.json","utf-8",async (err,data)=>{
//     if(err) throw err;
//    users = await JSON.parse(data);
// //    console.log(users);
// })
const {userModel} = require("../model/userModel");
//list all users
function ListAllUser(req,res){
    // console.log(users);
    res.status(200).json({status:"ok",data:users});
}

//create user
const CreateUser =async (req,res)=>{
    // let userData ={...req.body, "id": users.length};
    // users.push(userData);
    // fs.appendFile("./users.json",users,"utf-8",(err,data)=>{
    //     if(err){
    //         res.json({"status":"not ok"});
    //         throw err;
    //     };

    //     res.json({"status":"ok"})
    // })
    let body =await req.body;
    let userExist =await userModel.findOne({email:body.email});

    if(userExist){
       return res.status(400).json({status:"user exist"});
    }

    let userCreate =await userModel.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
    })

    if(userCreate){
        res.setHeader("Name","Saurabh Kumar");
       return res.status(200).json({status:"ok",id:userCreate.id});

    }
    // console.log(body);
    // console.log(req.headers);
    return res.status(200).json({status:"server error while user creating."});
}


module.exports = {ListAllUser,CreateUser}
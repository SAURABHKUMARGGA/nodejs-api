//const fs = require('fs');

// let users="";

// fs.readFile("./users.json","utf-8",async (err,data)=>{
//     if(err) throw err;
//    users = await JSON.parse(data);
// //    console.log(users);
// })
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//list all users
async function ListAllUser(req, res) {
  // console.log(users);
  const users = await userModel.find({});
  res.status(200).json({ status: "ok", data: users });
}

//create user
const CreateUser = async (req, res) => {
  // let userData ={...req.body, "id": users.length};
  // users.push(userData);
  // fs.appendFile("./users.json",users,"utf-8",(err,data)=>{
  //     if(err){
  //         res.json({"status":"not ok"});
  //         throw err;
  //     };

  //     res.json({"status":"ok"})
  // })
  let body = await req.body;
  let userExist = await userModel.findOne({ email: body.email });

  if (userExist) {
    return res.status(400).json({ status: "user exist" });
  }

  let userCreate = await userModel.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    password: body.password,
  });

  if (userCreate) {
    res.setHeader("Name", "Saurabh Kumar");
    jwt.sign(
      { data: { id: userCreate._id } },
      "secret",
      { expiresIn: 60 * 2 },
      function (err, token) {
        if (err)
          return res
            .status(500)
            .json({ staus: "not ok", msg: "server token creating error" });
        return res
          .status(201)
          .json({ status: "ok", id: userCreate._id, token });
      }
    );
  } else {
    return res
      .status(200)
      .json({ status: "server error while user creating." });
  }
  // console.log(body);
  // console.log(req.headers);
  // console.log(userCreate);
};

const loginUser = async (req, res) => {
  let { email, password } = await req.body;

  let userExist = await userModel.findOne({ email: email });
  // console.log(userExist);
  if (!userExist) {
    return res
      .status(400)
      .json({ status: "user not found please first signup" });
  }
  bcrypt.compare(password, userExist.password).then((result) => {
    if (result) {
      // const token = jwt.sign({"data":{id:userExist._id,email:userExist.email}},'secret',{expiresIn: 60 * 2})
      jwt.sign(
        { data: { id: userExist._id, email: userExist.email } },
        "secret",
        { expiresIn: 60 * 2 },
        function (err, token) {
          if (err)
            return res
              .status(500)
              .json({ staus: "not ok", msg: "server token creating error" });
          return res
            .status(200)
            .json({ status: "ok you logged in", data: { email, password, token } });
        }
      );
    } else {
      return res.status(400).json({ status: "password not matched" });
    }
  });
};

module.exports = { ListAllUser, CreateUser, loginUser };

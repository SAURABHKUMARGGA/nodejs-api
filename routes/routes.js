const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController")
const {middleware} = require("../middleware/middleware")

Router.get("/",middleware,userController.ListAllUser);
Router.post("/create",userController.CreateUser);

Router.post("/login",userController.loginUser);

module.exports = Router;
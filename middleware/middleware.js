
const middleware = (req,res,next)=>{
    console.log("this is middle ware");
    next();
}

module.exports = {middleware};
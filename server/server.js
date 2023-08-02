const express = require("express");
require("./data/config")
const User = require("./data/user")
const bodyParser = require("body-parser");
const cors = require("cors");
const { DUserData,DUsersDataList,DLoginnedUserData } = require("./data/users");

const PORT = process.env.PORT | 3001;


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({ systemMessage: "Working,Not Problem" });
});

app.get("/users", async (_, res) => {
  const data = await User.find();
    res.json(data);
  });

app.get("/delete/:id",async (req,res)=>{
  let result =await User.deleteOne({_id:req.params.id});
  res.send(result)
})

app.get("/users/:id",async (req,res)=>{
  const data = await User.findOne({_id:req.params.id});
  if(data){
    res.json(data);}
    else{
      res.json({Message:"No Data Founded"})
    }
})

app.put("/edit/:id",async (req,res)=>{
  const data = await User.updateOne({_id:req.params.id},{$set:req.body});
  res.json(result)
})

app.post("/user/create",async (req,res)=>{
 let newUser = {
   id:"4",
   firstName: `${req.body.firstName}`,
   lastName:`${req.body.lastName}`,
   email:`${req.body.email}`,
   age : 0,
   password:"shifre",
   roles: "Employer"
 }
 let user =  new User(newUser);
 let result = await user.save();
 res.send(result);
})



app.post("/login", (req, res) => {
  if (      
    req.body.email === DUserData.email &&
    req.body.password === DUserData.password
  ) {
    res.json({ token: "YourTOKEN-CODE",user:DLoginnedUserData });
  } else {
    res.sendStatus(404);
  }
});

app.get("/logout",(req,res)=>{
  res.json({ Message: "User is logouted" });
})

app.post("/register",(req,res)=>{
    res.json({ RegisterMSG: "Register" });
})

app.listen(PORT, () => {
  console.log("Server Is Working...");
});

const express = require("express");
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

app.get("/users", (_, res) => {
    res.json(DUsersDataList);
  });

app.get("/delete/:id",(req,res)=>{
  DUsersDataList.splice(req.params.id,1)
  res.json({Message:`${DUsersDataList.find(x=>x.id===req.params.id)?.firstName} - user is deleted db`})
})

app.get("/users/:id",(req,res)=>{
  res.json({User:DUsersDataList.find(x=>x.id===req.params.id)})
})

app.post("/edit/:id",(req,res)=>{
  const editUser = DUsersDataList.find(x=>x.id===req.params.id);
  editUser.firstName = req.body.firstName;
  editUser.lastName = req.body.lastName;
  editUser.email = req.body.email;
  res.json({Message:"User Updated"})
})

app.post("/user/create",(req,res)=>{
  const NewUserData = {
    id:`${DUsersDataList.length+1}`,
    firstName: `${req.body.firstName}`,
    lastName:`${req.body.lastName}`,
    email:`${req.body.email}`,
    age : 0,
    password:"shifre",
    roles: `${req.body.roles}`
  }
  DUsersDataList.push(NewUserData)
  res.json({Message:"User Created"})
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

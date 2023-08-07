const express = require("express");
require("./data/config");
const User = require("./data/user");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  DUserData,
  DUsersDataList,
  DLoginnedUserData,
} = require("./data/users");
const secretKey = "jwtSecretKey";
const PORT = process.env.PORT | 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (_, res) => {
  res.json({ systemMessage: "Working,Not Problem" });
});

app.get("/users", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.send(400)
      // res.json({ result: "Token is not valid" });
    } else {
      const data = await User.find();
      res.json(data);
    }
  });
});

app.get("/delete/:id",verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.json({ result: "Token is not valid" });
    } else {
      let result = await User.deleteOne({ _id: req.params.id });
      res.send(result);
    }
  });
  // let result = await User.deleteOne({ _id: req.params.id });
  // res.send(result);
});

app.get("/users/:id",verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.json({ result: "Token is not valid" });
    } else {
      const data = await User.findOne({ _id: req.params.id });
      if (data) {
        res.json(data);
      } else {
        res.json({ Message: "No Data Founded" });
      }
    }
  });
  // const data = await User.findOne({ _id: req.params.id });
  // if (data) {
  //   res.json(data);
  // } else {
  //   res.json({ Message: "No Data Founded" });
  // }
});

app.put("/edit/:id",verifyToken, async (req, res) => {
  const data = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json(data);
});

app.post("/user/create",verifyToken, async (req, res) => {
  jwt.verify(req.token, secretKey, async (err, authData) => {
    if (err) {
      res.json({ result: "Token is not valid" });
    } else {
      let user = new User(req.body);
      let result = await user.save();
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  if (
    req.body.email === DUserData.email &&
    req.body.password === DUserData.password
  ) {
    const user = req.body;
    jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
      res.json({ token });
    });
  } else {
    res.sendStatus(404);
  }
});

app.get("/logout", (req, res) => {
  res.json({ Message: "User is logouted" });
});

app.post("/register", (req, res) => {
  res.json({ RegisterMSG: "Register" });
});

app.listen(PORT, () => {
  console.log("Server Is Working...");
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== " ") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ result: "Token is not valid !" });
  }
}


app.get("/check-token", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, async (err) => {
    if (err) {
      // res.json({ result: "Token is not valid" });
      res.status(404);
    } else {
      // res.json(data);
      res.status(200)
    }
  });
});
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

var bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/netflix").then(() => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use("/", router);
router.use(bodyParser.json());

app.listen("3001", () => {
  console.log("Server is running");
});

let userSchema = mongoose.Schema({
  email: String,
  user_name: String,
  password: String,
  todos: [
    {
      title: String,
      date: Date,
      description: String,
      completed: Boolean,
    },
  ],
});

let User = mongoose.model("users", userSchema);

// SIGN UP SECTION
router.post("/signup", async (req, res) => {
  if (req.body.password.length <= 6) {
    res.status(404).json({ err: "password must be at least 6 characters" });
    return;
  }
  let checkUser = await User.find({ email: req.body.email });
  console.log(checkUser);
  if (checkUser[0]?.email) {
    return res.status(404).send({ err: "User already exists" });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let newuser = new User({
        email: req.body.email,
        user_name: req.body.user_name,
        password: hash,
      });
      newuser.save().then(() => {
        res.send({
          data: {
            email: newuser.email,
            user_name: newuser.user_name,
          },
          message:"User saved successfully"
        });
      });
    }
  });
});

// SIGN IN SECTION
router.post("/signin", async (req, res) => {
  let checkUser = await User.find({ email: req.body.email });

  if (checkUser[0]?.email) {
    bcrypt.compare(req.body.password, checkUser[0].password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result) {
          res.send({
            email: checkUser[0].email,
            user_name: checkUser[0].user_name,
          });
        } else {
          res.status(404).send({ err: "Incorrect password" });
        }
      }
    });
  } else {
    res.status(404).send({ err: "User not found!" });
  }
});

// ADD A NEW TODO
router.put("/addtodo", (req, res) => {
  let todo = {
    title: req.body.title,
    date: new Date(),
    description: req.body.description,
    completed: req.body.completed,
  };
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { todos: todo } }
  ).then((updatedusers) => {
    if (updatedusers) {
      res.send({
        email: updatedusers.email,
        user_name: updatedusers.user_name,
        todos: updatedusers.todos,
      });
    } else {
      res.status(404).send({ err: "User not found!" });
    }
  });
});

// UPDATE THE STATUS OF TODO
router.put("/updatestatus", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      let todo = user.todos.find((t) => t._id == req.body._id);
      todo.completed = !todo.completed;
      user.save().then((updatedusers) => {
        res.send({
          email: updatedusers.email,
          user_name: updatedusers.user_name,
          todos: updatedusers.todos,
        });
      });
    } else {
      res.status(404).send({ err: "User not found!" });
    }
  });
});

//EDIT TODO DETAILS
router.put("/edittodo", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      let todo = user.todos.find((t) => t._id == req.body._id);
      todo.title = req.body.title;
      todo.description = req.body.description;
      user.save().then((updatedusers) => {
        res.send({
          email: updatedusers.email,
          user_name: updatedusers.user_name,
          todos: updatedusers.todos,
        });
      });
    }
  });
});

//DELETE TODO
// router.put("/deletetodo", (req,res)=> {
//   User.updateOne({email: req.body.email} , {pull : {todo : {_id : req.body.id}}} , (err,result)=> {
//     if(err){
//       res.status(500).send(err);
//     }else{
//       res.send({
//         email: req.body.email,
//         user_name: req.body.user_name,
//         todos: req.body.todos
//       })
//     }
//   })
// })

router.post("/deletetodo", async (req, res) => {
  var user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    var todo = user.todos.find((t) => t._id == req.body._id);
    user.todos.pull(todo);
    user.save().then((updatedusers) => {
      res.send({
        email: updatedusers.email,
        user_name: updatedusers.user_name,
        todos: updatedusers.todos,
      });
    });
  } else {
    res.status(404).send({ err: "User not found!" });
  }
});

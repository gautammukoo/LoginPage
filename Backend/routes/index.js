var express = require('express');

var router = express.Router();


// Users list
const users = [
  {email : "xyz@xyz.com", password : "password", phone : 9999999999}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Welcome to backend server");
});

// Validate user login
router.post("/login", function(req, res) {
  console.log("POST REQ BODY", req.body)
  let userCheck = users.find(user => user.email === req.body.email || user.phone === Number(req.body.email))
  if(userCheck) {
    if(userCheck.password === req.body.password) {
      res.status(200).send({message : "Successful Login!"})
    }
    else {
      res.status(200).send({message : "Password Incorrect!"})
    }
  }
  else {
    res.status(200).send({message : "User not found!"})
  }
})

// Retrieve user password
router.put('/:id', function(req, res) {
  console.log("PUT CALL PARAM", req.params.id)
  if(req.params.id) {
    let userCheck = users.find(user => user.email === req.params.id || user.phone === Number(req.params.id))
    if(userCheck) {
      let userIndex = users.findIndex(user => user.email === req.params.id || user.phone === Number(req.params.id))
      res.status(200).send({message : `Your password is : '${users[userIndex].password}'`})
    }
    else {
      res.status(200).send({message : "User not found!"})
    }
  }
  else {
    res.status(200).send({message : "Please provide valid Email / phone number"})
  }
})

module.exports = router;

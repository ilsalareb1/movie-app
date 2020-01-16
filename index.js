const express = require ("express");

require("./db/mongoose"); //ensures mongoose runs and connects to our database
const app = express();
const movieRouter = require("./routers/movies");
app.use(express.json());
app.use(movieRouter);
app.listen(3000, () => {
  console.log("Server up on 3000");
});


// bcrypt hashing will occur as middleware during requests
/* 
const bcrypt = require("bcryptjs");
const testFunction = async () => {
  const password = "siths1234";
  const hashedPassword = await bcrypt.hash(password, 6);
  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("obeysudo", hashedPassword);
  console.log(isMatch);

};

testFunction();
 */

const jwt = require("jsonwebtoken");

const testFunction = async()=> {
  const token = jwt.sign({_id: "5e1f3ff"}, "obeysudo", {
     expiresIn: "7d"
  });
  console.log(token);
  const data = jwt.verify(token, "obeysudo");
  console.log(data);
};

testFunction();

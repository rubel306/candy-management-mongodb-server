const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//post method
app.post("/add", (req, res) => {
  const addCandy = req.body;
  res.send(addCandy);
  console.log(addCandy);
});
//creating server port
app.get("/", (req, res) => {
  res.send("Welcome to Candy Management System with MongoDb ..");
});

//listen port
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
});

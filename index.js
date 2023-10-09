require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3cydldd.mongodb.net/?retryWrites=true&w=majority`;
console.log("DB_uri:", uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3cydldd.mongodb.net/?retryWrites=true&w=majority`;
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
    const candyCollection = client.db("candyDB").collection("candies");

    //show candies by get method
    app.get("/candies", async (req, res) => {
      const cursor = await candyCollection.find().toArray();
      res.send(cursor);
    });

    //get one candy for update
    app.get("/update-candy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await candyCollection.findOne(query);
      res.send(result);
    });
    //delete one item based on id
    app.delete("/candy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await candyCollection.deleteOne(query);
      res.send(result);
    });
    //post method
    app.post("/add", async (req, res) => {
      const addCandy = req.body;
      const result = await candyCollection.insertOne(addCandy);
      res.send(result);
    });

    //update candy by put method
    app.put("/update-candy/:id", async (req, res) => {
      const id = req.params.id;
      const existCandy = req.body;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateCandy = {
        $set: {
          name: existCandy.name,
          country: existCandy.country,
          category: existCandy.category,
          photo: existCandy.photo,
        },
      };
      const result = await candyCollection.updateOne(
        query,
        updateCandy,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//creating server port
app.get("/", (req, res) => {
  res.send("Welcome to Candy Management System with MongoDb ..");
});

//listen port
app.listen(port, () => {
  console.log(`Your server is running on port: ${port}`);
});

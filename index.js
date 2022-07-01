const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId=require("mongodb").ObjectId
const port = process.env.PORT || 5000;
require("dotenv").config()
const cors = require("cors");

app.get("/", (req, res) => {
    res.send("Server running successfully");
  });

  app.get("/check",(req,res)=>{
    res.send("Checking  this for remote url change")
})
  
app.use(cors({
    origin: "*"
  }));
  app.use(express.json());
  
  
// Mongo connect 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.poglh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


  async function run() {
    try {

        await client.connect();
        const tasksCollection = client.db("todo-manager").collection("task");
        const completeTaskCollection = client.db("complete-todo").collection("complete");

        

        console.log("Connected to MongoDB database");
  } finally {
  }
}

run().catch(console.dir);




app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
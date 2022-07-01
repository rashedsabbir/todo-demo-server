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

        app.get("/tasks", async (req, res) => {
            const q = req.query;
            console.log(q);
      
            const cursor = tasksCollection.find(q);
      
            const result = await cursor.toArray();
      
            res.send(result);
          });

          app.post("/task", async (req, res) => {
            const data = req.body;
            console.log("from post api", data);
      
            const result = await tasksCollection.insertOne(data);
      
            res.send(result);
          });  

        app.put("/task/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            console.log("from update api", data);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
      
            const updateDoc = {
              $set: {
                title: data.title,
                textData: data.textData,
              },
            };
      
            const result = await tasksCollection.updateOne(
              filter,
              updateDoc,
              options
            );
            res.send(result);
          });

          app.delete("/task/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
      
            const result = await tasksCollection.deleteOne(filter);
      
            res.send(result);
          });

          app.post('/complete', async (req, res) => {

            const data = req.body;
            const result = await completeTaskCollection.insertOne(data);
            res.send(result)
          })

        console.log("Connected to MongoDB database");
  } finally {
  }
}

run().catch(console.dir);




app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
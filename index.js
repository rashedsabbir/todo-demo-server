const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");


app.use(cors({
    origin: "*"
  }));
  app.use(express.json());
  
  


  async function run() {
    try {

        console.log("Connected to MongoDB database");
  } finally {
  }
}

run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
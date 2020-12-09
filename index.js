const express = require("express");
const mongoose = require("mongoose");
const randomstring = require("randomstring");
const app = express();
const Item = require("./models/Item");

// PORT
const port = process.env.PORT || 3000;

// BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MONGO DB CONNECTION
// const db = "mongodb://localhost:27017/docker"; // Localhost
const db = "mongodb://mongo:27017/docker"; // Docker

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Mongo DB Connected`))
  .catch((err) => console.log(err));

// ROUTES
app.get("/", (req, res) => {
  res.send("Dockerizing Node App With Github Actions 2");
});

app.get("/getData", async (req, res) => {
  const data = await Item.find();
  res.json({ status: 200, data: data });
});

app.get("/addData", async (req, res) => {
  const random = randomstring.generate();

  const newItem = new Item({
    name: random,
  });

  newItem.save().then((item) => res.redirect("/getData"));
});

// EXPRESS SERVER
app.listen(port, () => console.log(`Dockerizing Node App on Port ${port}`));

// DOCKER COMMANDS ~

// BUILD DOCKER IMAGE :-
// docker build -t my-node-docker .

// RUN DOCKER IMAGE :-
// docker run -it -p 5000:3000 my-node-docker

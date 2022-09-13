const express = require("express");
const datasource = require("./utils");
const wildersController = require("./controllers/Wilders");
const skillsController = require("./controllers/Skills");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello you!");
});

/**
 * Wilders Routes
 */
app.post("/api/wilders", wildersController.create);

// GET http://localhost:3000/api/wilders/3
app.get("/api/wilders/:wilderId", wildersController.find);

/**
 * Skills Routes
 */
app.post("/api/skills", skillsController.create);
app.get("/api/skills", skillsController.findAll);

// end of request

app.listen(3000, () => {
  console.log("Server started, youpi!");

  datasource.initialize().then(() => {
    console.log("I'm connected!");
  });
});

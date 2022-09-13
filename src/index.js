const express = require("express");
const datasource = require("./utils");
const wildersController = require("./controllers/Wilders"); // → objet (key-value)
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
app.get("/api/wilders", wildersController.findAll);
app.get("/api/wilders/:wilderId", wildersController.find);
app.put("/api/wilders/:wilderId", wildersController.update);
app.delete("/api/wilders/:wilderId", wildersController.delete);

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

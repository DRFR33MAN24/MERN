const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const db = require("./database");

const app = express();

app.use(express.json());

// DB Config
// const db = config.get("mongoURI");

//connect to mongodb
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// db.authenticate()
//   .then(function() {
//     console.log("CONNECTED! ");
//     db.sync();
//     console.log("All models were synchronized successfully.");
//   })
//   .catch(function(err) {
//     console.log("SOMETHING DONE GOOFED");
//   })
//   .done();

db.authenticate()
  .then(() => {
    console.log("Authenticated");
    db.sync();
    console.log("All models were synchronized successfully.");
    db.close();
  })
  .catch(err => {
    console.log("Unable to connect", err);
  });

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port);

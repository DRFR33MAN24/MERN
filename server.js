const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const db = require("./database");
const User = require('./models/User');
const Payment = require('./models/Payment');
const app = express();

app.use(express.json());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// DB Config
// const db = config.get("mongoURI");

//connect to mongodb
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

db.authenticate()
  .then(() => {
    console.log("Authenticated");
    db.sync({ force: false });
    //db.close();
  })
  .catch(err => {
    console.log("Unable to connect", err);
  });

Payment.belongsTo(User);
User.hasMany(Payment);
//app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/offers", require("./routes/api/offers"));
app.use("/api/activity", require("./routes/api/activity"));
app.use("/api/postback", require("./routes/api/postback"));
app.use("/api/email", require("./routes/api/email"));
app.use("/api/stats", require("./routes/api/stats"));
app.use("/api/contact", require("./routes/api/contact"));

// Serve static assets if in production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port);

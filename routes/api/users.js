const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { stringify } = require("query-string");
// User Model
const User = require("../../models/User");

// @route POST api/users
// @desc Register New User
// @acces Public
router.post("/", async (req, res) => {
  const { name, email, password, active, token } = req.body;

  // Verify URL
  const query = stringify({
    secret: config.get("reCAPTCHA"),
    response: req.body.token,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `${config.get("verifyURL")}${query}`;
  //console.log(verifyURL);
  const body = await axios.get(verifyURL);
  //console.log(body.data);
  if (body.data.success !== undefined && !body.data.success) {
    return res.status(400).json({ msg: "Failed captcha verification" });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for exitsting user
  User.findOne({ where: { email: `${email}` } }, { plain: true }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User alerady exists." });
    }

    // const newUser = new User({
    //   name,
    //   email,
    //   password
    // });
    const newUser = User.build({
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
      active: `${active}`
    });

    // Create salt and hash

    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  active: user.active
                }
              });
            }
          );
        });
      });
    });
  });
});

// pass the old user info
router.post("/update", (req, res) => {
  console.log("update route called");
  const { name, email, password, id, wallet } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  console.log(name, email, password, wallet);
  User.findOne({ where: { id: `${id}` } }, { plain: true }).then(user => {
    if (user) {
      //update existing user
      // const newUser = User.build({
      //   name: `${name}`,
      //   email: `${email}`,
      //   password: `${password}`
      // });

      // Create salt and hash

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, (err, hash) => {
          if (err) throw err;

          User.update(
            {
              name: `${name}`,
              email: `${email}`,
              password: `${hash}`,
              wallet: `${wallet}`,
              active: false
            },
            { where: { id: `${id}` } }
          ).then(user => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    active: user.active
                  }
                });
              }
            );
          });
        });
      });
    }
  });
});
// pass the old user info
router.post("/reset", (req, res) => {
  console.log("reset route called");
  const { email, password, token } = req.body;

  if (!token || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  console.log(email, password, token);
  User.findOne({ where: { id: `${id}` } }, { plain: true }).then(user => {
    if (user) {
      //update existing user
      // const newUser = User.build({
      //   name: `${name}`,
      //   email: `${email}`,
      //   password: `${password}`
      // });

      // Create salt and hash

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, (err, hash) => {
          if (err) throw err;

          User.update(
            {
              name: `${name}`,
              email: `${email}`,
              password: `${hash}`,
              wallet: `${wallet}`,
              active: false
            },
            { where: { id: `${id}` } }
          ).then(user => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    active: user.active
                  }
                });
              }
            );
          });
        });
      });
    }
  });
});

module.exports = router;

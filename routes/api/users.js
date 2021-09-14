const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route POST api/users
// @desc Register New User
// @acces Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

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
      password: `${password}`
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
  const { name, email, password, id } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  console.log(name, email, password);
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
              password: `${hash}`
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

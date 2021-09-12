const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
// User Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Auth the user
// @acces Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ where: { email: email } }, { plain: true }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User Does not exists." });
    }

    // Validate password
    bcryptjs.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
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
              balance: user.balance
            }
          });
        }
      );
    });
  });
});

// Check for exitsting user
//   User.findOne({ email }).then(user => {
//     if (!user) {
//       return res.status(400).json({ msg: "User Does not exists." });
//     }

//     // Validate password
//     bcryptjs.compare(password, user.password).then(isMatch => {
//       if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
//       jwt.sign(
//         { id: user.id },
//         config.get("jwtSecret"),
//         {
//           expiresIn: 3600
//         },
//         (err, token) => {
//           if (err) throw err;
//           res.json({
//             token,
//             user: {
//               id: user.id,
//               name: user.name,
//               email: user.email
//             }
//           });
//         }
//       );
//     });
//   });
// });

router.get("/user", auth, (req, res) => {
  User.findAll({
    where: {
      id: req.user.id
    },
    attributes: ["password"],
    plain: true
  }).then(user => res.json(user));

  // User.findById(req.user.id)
  //   .select("-password")
  //   .then(user => res.json(user));
});
module.exports = router;

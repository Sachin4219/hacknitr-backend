import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ user: user.username }, "kadabra", {
    expiresIn: "20min",
  });
};

export const registerUser = (req, res) => {
  const { username, password, email } = req.body;
  try {
    // console.log(username,password)

    // Find if username already exists or not
    User.findOne({ username }, async (err, foundUser) => {
      if (err) throw err;
      else {
        // If user already exists
        if (foundUser) {
          // console.log('"' + username + '" is already taken');
          res
            .status(409)
            .json({ message: '"' + username + '" is already taken' });
        } else {
          // Create hash
          const hash = await bcrypt.hash(password, 10);
          // console.log("Hash created", hash)

          const newUser = new User({ username, password: hash , email});
          await newUser.save();

          // console.log("User Created: ", {
          //   username: newUser.username,
          //   token: generateToken(newUser),
          // });
          res.status(201).json({
            username: newUser.username,
            token: generateToken(newUser),
          });
        }
      }
    });
  } catch (error) {
    // console.log("Unable to register User");
    res.status(409).json({ message: error.message });
  }
};

export const forgotUser = (req, res) => {
  const { username, password } = req.body;
  try {
    // console.log(username,password)

    // Find if username already exists or not
    User.findOne({ username }, async (err, foundUser) => {
      if (err) throw err;
      else {
        // If user already exists
        if (foundUser) {
          // console.log('"' + username + '" is already taken');
          const hash = await bcrypt.hash(password, 10);
          // console.log("Hash created", hash)
          foundUser.password = password
          await foundUser.save();

          // console.log("User Created: ", {
          //   username: newUser.username,
          //   token: generateToken(newUser),
          // });
          res.status(201).json({
            username: foundUser.username,
            token: generateToken(foundUser),
          });
        } else {
          res
            .status(409)
            .json({ message: 'error user not found' });
          // Create hash
        }
      }
    });
  } catch (error) {
    // console.log("Unable to register User");
    res.status(409).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  try {
    const foundUser = await User.findOne({ username });
    const hash = foundUser.password;
    bcrypt.compare(password, hash, (err, result) => {
      if (err) console.log(err);
      else {
        if (result) {
          // console.log("Hooray")
          // console.log("Logged In: ", {
          //   username: foundUser.username,
          //   token: generateToken(foundUser),
          // });
          res.status(200).json({
            data: {
              username: foundUser.username,
              token: generateToken(foundUser),
            },
            error: false,
            message: "Login Successfull",
          });
        } else {
          // console.log("Password Does not match");
          res.status(401).json({
            data: {},
            error: true,
            message: "Invalid credentials",
          });
        }
      }
    });
  } catch (error) {
    // console.log("Unable to login User");
    res.status(409).json({ message: error.message });
  }
};

export const check_authUser = (req, res, next) => {
  console.log("Cheking Auth");
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, "kadabra");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};


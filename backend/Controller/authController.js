const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../Model/authModel");
const { createAccToken, createRefToken } = require("../util/token");

const authController = {
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        age,
        gender,
        email,
        mobile,
        password,
        country,
        city,
        district,
        address,
        state,
      } = req.body;
      const passHash = await bcrypt.hash(password, 10);
      // res.json("register called")
      const newUser = await Auth({
        firstName,
        lastName,
        age,
        gender,
        country,
        city,
        district,
        email,
        mobile,
        address,
        state,
        password: passHash,
      });
      res.json({
        data: newUser,
      });
      await newUser.save();
      res.status(200).json({ msg: "User registered successfully" });

      // let subject = "Food Bang - New User Registration";
      // let content = `<div>
      // <h1>Hello, ${name} Welcome to Food Bang Application.</h1>
      // <h5>Your mail Id is = ${email} is successfully Registered with Food-Bang.. your Password is = ${password} </h5>
      // <p>Enjoy our services with Food-Bang Team..</p>
      // </div>`;

      // let mailResp = sendMail(email, subject, content);

      // res
      //     .status(200)
      //     .json({ msg: "User registered successfully", output: mailResp });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const extUser = await Auth.findOne({ email });
      if (!extUser)
        return res.status(400).json({ msg: "User doesn`t exists." });
      const isMatch = await bcrypt.compare(password, extUser.password);
      if (!isMatch)
        return res.status(400).json({ msg: "password doesn`t match" });
      // res.json({data: extUser})
      const accessToken = createAccToken({ id: extUser._id });
      const refreshToken = createRefToken({ id: extUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        signed: true,
        path: `/api/v1/auth/refreshToken`,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      // res.json("logout called")
      res.clearCookie("refreshToken", { path: `/api/v1/auth/refreshToken` });
      return res.status(200).json({ msg: "Successfully loged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      // res.json("refresh token called")
      const ref = req.signedCookies.refreshToken;
      // res.json({ ref })
      if (!ref)
        return res.status(400).json({ msg: "Session Expired...Login Again" });
      jwt.verify(ref, process.env.REF_TOKEN_SECRET, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "Invalid Auth... Login Again..." });
        const accessToken = createAccToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authController;

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authCtrl = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (user) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким ником уже существует!" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        ...req.body,
        password: hashPassword,
      });
      return res
        .status(200)
        .json({ message: "Вы успешно зарегистрировались!", ...newUser._doc });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователя с таким ником не существует!" });
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      }
      const access_token = jwt.sign(
        { payload: { _id: user._id } },
        process.env.ACCESS_TOKEN,
        { expiresIn: "2h" }
      );
      const refresh_token = jwt.sign(
        { payload: { _id: user._id } },
        process.env.REFRESH_TOKEN,
        { expiresIn: "2w" }
      );

      res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: "/api/refreshToken",
      });
      return res.status(200).json({
        message: "Вы успешно авторизовались!",
        access_token,
        user: { ...user._doc, password: "" },
      });
    } catch (error) {
      console.log(error);
    }
  },
  logout: async (req, res) => {
    res.clearCookie("refreshToken", { pat: "/api/refreshToken" });
    res.status(200).json({ message: "Logout success" });
  },

  refreshToken: async (req, res) => {
    try {
      const rfToken = req.cookies.refreshToken;

      if (!rfToken)
        return res.status(400).json({ message: "Пожалуйста войдите!" });

      jwt.verify(rfToken, process.env.REFRESH_TOKEN, async (err, result) => {
        console.log(result);

        if (err)
          return res.status(400).json({ message: "Пожалуйста войдите!" });
        const user = await User.findOne({ _id: result.payload._id });
        console.log(user);
        if (!user) return res.status(400).json({ message: "Нет пользователя" });

        const access_token = jwt.sign(
          { payload: { _id: result._id } },

          process.env.ACCESS_TOKEN,

          { expiresIn: "2h" }
        );

        res.status(200).json({
          message: "Success",
          user: { ...user._doc, password: "" },
          access_token,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default authCtrl;

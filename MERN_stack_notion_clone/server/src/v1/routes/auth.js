const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

//ユーザー新規登録API
router.post(
  "/register",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は８文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは８文字以上である必要があります"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは８文字以上である必要があります"),
  body("username").custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject("このユーザーはすでに使われています");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  async (req, res) => {
    //パスワードの受け取り
    const password = req.body.password;

    try {
      //パスワードの暗号化
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      //ユーザーの新規作成（MONGODBにユーザー情報を保存する）
      const user = await User.create(req.body);
      //JWTの発行
      const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//ユーザーログイン用API
module.exports = router;

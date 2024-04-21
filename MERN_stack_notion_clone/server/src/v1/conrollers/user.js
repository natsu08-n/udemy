const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

exports.register = async (req, res) => {
  //パスワードの受け取り
  const password = req.body.password;

  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
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
};

//ユーザーログイン用API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //DBからユーザーが存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({
        errors: {
          param: "username",
          mesage: "ユーザー名が無効です",
        },
      });
    }

    /*
     ** パスワードが合っているか照合する
     */

    //暗号化されたパスワードを複合化
    const descryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    //複合化したパスワードとログイン字入力したパスワードが一致しなければエラー返す
    if (descryptedPassword !== password) {
      res.status(401).json({
        errors: {
          param: "password",
          mesage: "パスワードが無効です",
        },
      });
    }

    //パスワード一致していればJWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

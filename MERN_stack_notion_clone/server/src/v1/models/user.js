const mongoose = require("mongoose");

// 新しいスキーマ（データの構造や形式を定義するもの）を定義
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/*この行で、定義したスキーマをもとにUserという名前のモデルを作成し、それをエクスポート。
このモデルは、アプリケーションの他の部分から利用できるようになる。*/
module.exports = mongoose.model("User", userSchema);

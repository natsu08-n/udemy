module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  rules: {
    exclude: /node_modules\/@firebase/, //to exclude firebase from source-map
    exclude: /node_modules\/@firebase\/auth/, //to just exclude firebase auth from source-map
  },
};

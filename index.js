const express = require("express");
require("./front-end/src/db/config");
const User = require("./front-end/src/db/User");
const Product = require("./front-end/src/db/product");
const cors = require("cors");
const bodyParser = require("body-parser");
const product = require("./front-end/src/db/product");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  let newUser = new User(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (user) {
    res.send(user);
  } else {
    res.send({ result: "User not found!" });
  }
});

app.post("/addproduct", async (req, res) => {
  let products = new Product(req.body);
  let result = await products.save();
  res.send(result);
});

app.get("/product", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ error: "nothing in DB!" });
  }
});

app.delete("/product/:id", async (req, res) => {
  console.warn(req.body);
  const deleteProduct = await Product.deleteOne({ _id: req.params.id });
  res.send(deleteProduct);
});

app.get("/product/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ error: "data not found!" });
  }
});

app.put("/product/:id", async (req, res) => {
  const updatedProduct = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(updatedProduct);
});
// search route
app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

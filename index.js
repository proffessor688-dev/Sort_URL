const express = require("express");
const routeUrl = require("./routes/url");
const {URL} = require("./models/url");
const ejs = require("ejs");
const path = require("path");
const { connectToMongoDB } = require("./connection");
const staticRoute = require("./routes/staticRouter");
const PORT = 8001;

const app = express();

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error("MongoDb connection error:", err));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", routeUrl);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`server started at PORT ${PORT}`);
});

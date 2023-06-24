const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require ('./routes/auth')
const userRoute = require('./routes/user')
// db connect
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  })
  .catch((error) => {
    console.error("Lỗi kết nối đến cơ sở dữ liệu:", error);
  });
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());
app.use(cors());

// Route

app.use('/v1/auth', authRoute)
app.use('/v1/user', userRoute)
app.listen(8000, () => {
  console.log("server is running...");
});

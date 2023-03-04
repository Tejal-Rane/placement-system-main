const express= require("express");
const app  = express();
const dotenv= require("dotenv");
const connectDB= require("./config/db.js");
const authRoutes= require("./routes/authRoute.js");
const adminRoutes= require("./routes/adminRoutes.js");
const userRoutes= require("./routes/userRoutes.js");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const nodemailer= require("nodemailer");
const hbs= require("nodemailer-express-handlebars");
const path= require("path");
const forumRoutes= require("./routes/forumRoute.js");

//configure env
dotenv.config();



//middelwares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", forumRoutes);
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve(`./views`),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".hbs",
  })
);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});


const port = process.env.PORT || 8080;
//listen port
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server Running in on port ${port}`);
  });
});
module.exports=transporter
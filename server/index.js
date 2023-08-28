const express = require("express");
const app = express();
const {connectDb} = require("./config/database");
const route = require("./routes/route");
const cookieParser = require("cookie-parser");
const { connectwithcloudinary } = require("./config/cloudinary");
const fileupload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true,
}));
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : "/tmp/",
}));
app.use("/",route);

app.listen(process.env.PORT, () => {
    console.log("Listening to port no 4000");
});

connectDb();
connectwithcloudinary();
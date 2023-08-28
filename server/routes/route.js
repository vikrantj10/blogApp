const express = require("express");
const { signup, login, sendotp } = require("../controllers/authcontroller");
const { auth } = require("../middlewares/authmiddleware");
const { createblog, updateblog, deleteblog, likeablog, unlikeablog, getallblogdetails, getblogbyid } = require("../controllers/blogscontroller");
const { updatecomment, deletecomment, makeacomment } = require("../controllers/commentcontroller");
const { updateuser, deleteuser, getuserdetails } = require("../controllers/usercontroller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);

router.get("/getblogbyid/:id", getblogbyid);
router.get("/getallblogdetails", getallblogdetails);
router.post("/createblog", auth, createblog);
router.put("/updateblog", auth, updateblog);
router.put("/likeablog", auth, likeablog);
router.put("/unlikeablog", auth, unlikeablog);
router.delete("/deleteblog", auth, deleteblog);

router.post("/makeacomment", auth, makeacomment);
router.put("/updatecomment", auth, updatecomment);
router.delete("/deletecomment", auth, deletecomment);

router.get("/getuserdetails", auth, getuserdetails);
router.put("/updateuser", auth, updateuser);
router.delete("/deleteuser", auth, deleteuser);

module.exports = router;
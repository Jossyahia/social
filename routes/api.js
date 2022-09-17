const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const apisController = require("../controllers/api");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//apis Routes - simplified for now
router.get("/", apisController.getAllApi);
router.get("/:id", apisController.getById);
router.get("/title",  apisController.getByTitle);



//router.post("/createPost", upload.single("file"), postsController.createPost);

//router.put("/likePost/:id", postsController.likePost);

//router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

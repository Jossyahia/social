const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");

module.exports = {

  getAllApi: async (req, res) => {
    try {
      const posts = await Post.find().sort({ likes: "desc" }).lean();
      res.json(posts);
      console.log(posts);
    } catch (err) {
      console.log(err);
    }
},
  getByTitle: async (req, res) => {
    try {
      //const posts = await Post.find(req.post.title);
      const posts = await post.find( {title: "title" } )
      //const billtrackerItems = await BillTracker.find({userId:req.user.id})
      //let post = await Post.findById({ _id: req.params.id });
      res.json(posts)
      //res.render("profile.ejs", { posts: posts, post: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  /*
  getAll: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("apifeeds.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  */
  getById: async (req, res) => {
    try {
      const posts = await Post.findById(req.params.id);
      res.json(posts);
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
const Like = require("../models/Like");
const { getPostCommentsIterative } = require("../middleware/comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      post.likes = await Like.countDocuments({ post: req.params.id })
      const comments = await getPostCommentsIterative(post)

      res.render("post.ejs", { post: post, user: req.user, comments: comments});
   
  } catch(err){
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
      const obj = { user: req.user.id, post: req.params.id };

      if((await Like.deleteOne(obj)).deleteCount){
     
      console.log("Likes -1");
      res.redirect(`/post/${req.params.id}`);
    } 
    await Like.create(obj);
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
      post.likes = await Like.countDocuments({ post: req.params.id})
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      const commentIDs = [];

      const comments = await getPostCommentsIterative(post);

      while(comments.length) {
        comments.push(...comment.comments);
        commentIDs.push(comment.id);
      }

      await Comment.deleteMany({ _id: { $in: commentIDS}});
      await Like.deleteMany({ post: req.params.id });
      await Post.remove({ _id: req.params.id });
      console.log("post deleted");
      res.redirect("/profile");
    }catch{
      res.redirect("/profile");
    }
  },


   
};

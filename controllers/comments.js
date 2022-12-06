const Comment = require("../models/Comment");
const { getAllCommentsIterative } = require("../middleware/comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        text: req.body.text,
        user: req.user.id,
		post: req.params.commentId ? undefined : req.params.postId,
        comment: req.params.commentId
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment = await getAllCommentsIterative(...await Comment.findById(req.params.commentId))[0];
      if (!comment.comments.length){
        await comment.remove()
        console.log("Comment has been deleted!");
        return res.redirect("/post/" + req.params.postId);
      }
      comment.text = '';
      comment.deleted = true;
      await comment.save();
      console.log("Comment has been cleared!");
      res.redirect("/post/" + req.params.postId);
    } catch (err) {
      console.log(err);
    }
  },
  editComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      comment.text = req.body.text;
      comment.edited = true;
      await comment.save();
      console.log("Comment has been edited!");
      res.redirect("/post/" + req.params.postId);
    }
    catch (err) {
      console.log(err);
    }
  }
};
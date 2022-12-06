const Comment = require("../models/Comment");
const { getAllCommentsIterative } = require("../middleware/comment")

module.exports = {
  createComment: async (req, res) => {
    try {
        //User is part of req so we dont have to deconstruct an object
      const commentUser = await User.findById(req.user.id)
      await Comment.create({
        // text user post comment deleted edited to object
        text: req.body.text,
        user: req.user.id,
        post: req.params.commentId ? udenfined: req.params.postid,
        comment: req.body.commentId,
        likes: 0,
        // post: req.params.id,
        // createdBy: commentUser.userName,
        // createdById: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  //! Added delete comment method
  deleteComment: async (req, res) => {
    try {
    const comment = await getAllCommentsIterative(...await Comment.findById(req.params.commentId))[0];
    if(!comment.comments.length){
        await comment.remove()
        console.log("comment deleted");
        return res.redirect("/post/" + req.params.postid);
    }
    comment.text = '';
    comment.deleted = true;
    await comment.save();
    console.log("Comment Cleared");
    res.redirect("/post/" + req.params.postId);
   
  } catch(err){
    console.log(err);
   }
  },

  editComment: async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        comment.text = req.body.text;
        comment.edited = true;

        await comment.save();
        console.log("Comment has been edited");
        res.redirect("/post/" + req.params.postId);
    }
    catch(err) {
        console.log(err);
    }
  }
//   likePost: async (req, res) => {
//     try {
//       await Post.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $inc: { likes: 1 },
//         }
//       );
//       console.log("Likes +1");
//       res.redirect(`/post/${req.params.id}`);
//     } catch (err) {
//       console.log(err);
//     }
//   },

};
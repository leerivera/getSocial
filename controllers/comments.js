
const Post = require("../models/Post");
const Comment = require("../models/Comment")

module.exports = {

  createComment: async (req, res) => {
    try {
        // const commentUser = await User.find(  req.user.id );

      await Comment.create({
        comment: req.body.comment.User,
        
        
        likes: 0,
        post: req.params.id,
        createdBy: req.user.userName,
        createdByID: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  deleteComments: async (req, res) => {
    try {
        await Comment.deleteOne({_id: req.params.commentid })
        res.redirect("/post/"+req.params.postid)
        
    } catch(err) {
        console.log(err)

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
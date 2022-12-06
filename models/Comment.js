
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: {
    type: String
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    
  },
  likes: {
    type: Number,
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },  
  //! Added new schema properties to link comments to users - username for attribution, ID for show/hide delete button
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  // createdById: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  //! end changes
  deleted: { type: Boolean },
  edited: { type: Boolean }
}, {
  toObject: { virtuals: true }

  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("Comment", CommentSchema);
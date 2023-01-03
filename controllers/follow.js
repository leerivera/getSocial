const Follow = require('../models/Follow');
const User = require('../models/User');

module.exports = {
    followUser: async (req, res) => {
        const { receiver } = req.params;
        const sender = req.user._id;
        const follow  = await Follow.findOne({ sender, receiver });
        // if follow is true delet it to unfollow the user

        if (follow) {
            await follow.findOneAndDelete({ sender, receiver });
            follow = null;
        } else {
            // if no one follows create a new one to follow user

            follow = new Follow({ sender, receiver });
            await follow.save();
            follow.sender = req.user;
            follow.receiver = await User.findById(receiver);
        
        }
        res.json(follow);
    },
    unfollowUser: async (req, res) => {
        const { receiver } = req.params;
        const sender = req.user._id;
        const follow = await Follow.findOneAndDelete({ sender, receiver });
        res.json(follow);
    },
    viewProfile: async (req, res) => {
        try {
          // Retrieve the current user and list of followers from the database
          const user = req.user;
          const followers = await Follow.find({ receiver: user._id }).populate('sender');
    
          // Check if the current user is following the viewed user
          const following = await Follow.findOne({ sender: req.user._id, receiver: user._id });
    
          // Render the profile template and pass the user and followers variables to the template
          res.render('profile', { user, followers, following });
        } catch (error) {
          // Handle any errors that might occur
          console.error(error);
          res.status(500).send('Error retrieving profile');
        }
      }
    }
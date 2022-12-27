const Follow = require('../models/Follow');
const User = require('../models/User');

module.exports = {
    followUser: async (req, res) => {
        const { receiver } = req.params;
        const sender = req.user._id;
        const follow  = await Follow.findOne({ sender, receiver });
        if (follow) return res.status(400).end();
        const newFollow = await newFollow.save();
        fullFollow.sender = req.user;
        fullFollow.receiver = await User.findById(receiver);
        res.json(fullFollow);
    },
    unfollowUser: async (req, res) => {
        const { receiver } = req.params;
        const sender = req.user._id;
        const follow = await Follow.findOneAndDelete({ sender, receiver });
        res.json(follow);
    },
    viewProfile: async (req, res) => {
        const user = req.user;
        const followers = await Follow.find({ receiver: user._id }).populate('sender');
        res.render('profile', { user, followers });
    }
}
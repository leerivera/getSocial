const express = require("express");
const router = express.Router();
const followsController = require("../controllers/follow");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/followUser/:receiver", followsController.followUser);
router.delete("/unfollowUser/:receiver", followsController.unfollowUser);
router.get("/:username", followsController.viewProfile)

module.exports = router;
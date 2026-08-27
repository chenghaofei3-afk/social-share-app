const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/comments/:postId
// @desc    Create a comment on a post
router.post('/:postId', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide comment content',
      });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const comment = new Comment({
      post: req.params.postId,
      author: req.user.id,
      content,
    });

    await comment.save();
    post.comments.push(comment._id);
    await post.save();

    await comment.populate('author', 'username avatar');

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

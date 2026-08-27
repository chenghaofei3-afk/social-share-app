const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/messages/:userId
// @desc    Get messages with specific user
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user.id },
      ],
    })
      .populate('sender', 'username avatar')
      .populate('recipient', 'username avatar')
      .sort({ createdAt: 1 });
    
    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/messages/:userId
// @desc    Send a message
router.post('/:userId', auth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide message content',
      });
    }

    const message = new Message({
      sender: req.user.id,
      recipient: req.params.userId,
      content,
    });

    await message.save();
    await message.populate('sender', 'username avatar');
    await message.populate('recipient', 'username avatar');

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

const express = require('express');
const Community = require('../models/Community');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/communities
// @desc    Get all communities
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find()
      .populate('creator', 'username avatar')
      .sort({ memberCount: -1 });
    
    res.json({
      success: true,
      communities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/communities
// @desc    Create a new community
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, tags, icon, banner } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and description',
      });
    }

    const existingCommunity = await Community.findOne({ name });
    if (existingCommunity) {
      return res.status(400).json({
        success: false,
        message: 'Community already exists',
      });
    }

    const community = new Community({
      name,
      description,
      tags,
      icon,
      banner,
      creator: req.user.id,
      members: [req.user.id],
      memberCount: 1,
    });

    await community.save();
    await community.populate('creator', 'username avatar');

    res.status(201).json({
      success: true,
      community,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/communities/:id/join
// @desc    Join a community
router.post('/:id/join', auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      });
    }

    if (community.members.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Already a member of this community',
      });
    }

    community.members.push(req.user.id);
    community.memberCount += 1;
    await community.save();

    res.json({
      success: true,
      message: 'Successfully joined community',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

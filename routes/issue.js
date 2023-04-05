const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// route to create new issue
router.post('/create', issueController.create);

module.exports = router;
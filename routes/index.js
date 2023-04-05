const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// for home page
router.get('/', homeController.homePage);
// all project urls
router.use('/project', require('./project'));
// all issue urls
router.use('/issue', require('./issue'));

module.exports = router;
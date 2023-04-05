const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// route to create new project
router.post('/create', projectController.create);
// route to display complete info about project
router.get('/info/:id', projectController.projectInfo);
// route to search issue
router.post('/search', projectController.search);
// route to filter issues 
router.post('/filter', projectController.filter);

module.exports = router;
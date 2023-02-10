const express = require('express');
const { issueTrackerPage, createProject, addProjectToMongoDB, projectDetails, filterProjectDetails, createAnIssue, addAnIssue } = require('../controller/issueController');
const router = express.Router();

router.get('/', issueTrackerPage)
router.get('/createProject', createProject)
router.post('/addProject',addProjectToMongoDB)
router.get('/projectDetails', projectDetails)
router.post('/filterProjectDetails', filterProjectDetails)
router.get('/createAnIssue/:id', createAnIssue)
router.post('/createAnIssue/:id/addIssue', addAnIssue)

module.exports = router;
const Project = require('../models/project');

// action to open home page
module.exports.homePage = async (req, res) => {
    // fetching all projects made so far
    let projects = await Project.find({});
    return res.render('home',{
        title: 'Home Page',
        projects: projects
    })
}
const Issue = require('../models/issue');
const Project = require('../models/project')

// creating new issue
module.exports.create = async (req, res) => {
    // creted new issue
    let issue = await Issue.create(req.body); 
    console.log(issue);
    // pushing issues into project issue
    let project = await Project.findById(req.body.project);
    project.issues.push(issue.id);
    // saving project
    project.save();
    // finding all the issues of the project
    let issues = await Issue.find({project: req.body.project});  
    return res.render('project',{
        tittle: 'Project Page',
        project: project,
        issues: issues
    });
}

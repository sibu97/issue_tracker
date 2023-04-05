const Project = require('../models/project');
const Issue = require('../models/issue');

// action to create new project
module.exports.create = async (req, res) =>{
    try{
        let project = await Project.create(req.body);
        console.log(project);
        // returnning created project details in json format
        return res.json({
            data: {
                project: project,
            },
            message: 'project created successfully'
        })
    }catch(err){
        // if any error occurs
        console.log('Error in creating project ', err);
        return req.redirect('back');
    }
}
// action to display project complete info
module.exports.projectInfo = async (req, res) => {
    try{
        console.log(req.params.id);
        // fetching project with the help of id
        let project = await Project.findById(req.params.id);
        // fetching all issues of the project
        let issues = await Issue.find({project: req.params.id});

        // rendering project page 
        return res.render('project',{
            tittle: 'Project Page',
            project: project,
            issues: issues
        });
    }catch(err){
        // if any error occurs
        console.log('error in opening project page ', err)
        return res.redirect('back');
    }
}

// action to search issue
module.exports.search = async (req, res) => {
    try{
        console.log(req.body);
        // console.log()
        // fetching the project with the help of id and populating all the issues 
        let project = await Project.findById(req.body.project).populate('issues');
        // fetching issues according to searched text
        // let issues = await Issue.find({project: req.body.project, title: req.body.search});
        let issues = await Issue.find({
            $or: [
                {
                    project: req.body.project, title: req.body.search
                },
                {
                    project: req.body.project, description: req.body.search
                }
            ]
        });
        console.log(issues);
        // returning issues in json format
        return res.json({
            data: {
                project: project,
                issues: issues
            },
            message: 'search result'
        })
        

    }catch(err){
        // if any error occurs
        console.log('error in searching the issue ', err);
        return res.redirect('back');
    }
}
//  action to filter issues
module.exports.filter = async (req, res) => {
    try{
        console.log(req.body);
        console.log(req.body.author);
        console.log(req.body.labels);

        // fetching project
        let project = await Project.findById(req.body.project);
        var issues;
        if(req.body.author == undefined && req.body.labels == undefined){
            issues = await Issue.find({project: req.body.project});
        }
        else if(req.body.author == undefined){
            issues = await Issue.find({labels: {$in : req.body.labels}, project: req.body.project});
        }
        else if(req.body.labels == undefined){
            issues = await Issue.find({author: {$in : req.body.author}, project: req.body.project});
        }else{
            issues = await Issue.find({labels: {$in : req.body.labels}, author : {$in: req.body.author}, project: req.body.project});
        }
        console.log(issues);
        return res.json({
            data: {
                project: project,
                issues: issues
            }
        });
        

    }catch(err){
        // if any error occurs
        console.log('error in searching the issue ', err);
        return res.redirect('back');
    }
}

 
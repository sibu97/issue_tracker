const { ObjectId } = require('mongodb');
const mongoDB = require('../config/mongodb')

function filterBy(filter, projectDetails) {
    switch (filter) {
        case 'Title':
            for (let check = 0; check < projectDetails.length; ++check) {
                for (let index = 0; index < projectDetails.length - 1; ++index) {
                    let temp = null;
                    if (projectDetails[index].projectName > projectDetails[index + 1].projectName) {
                        temp = projectDetails[index];
                        projectDetails[index] = projectDetails[index + 1];
                        projectDetails[index + 1] = temp;
                    }
                }
            }
            return projectDetails;

        case 'Description':
            for (let check = 0; check < projectDetails.length; ++check) {
                for (let index = 0; index < projectDetails.length - 1; ++index) {
                    let temp = null;
                    if (projectDetails[index].description > projectDetails[index + 1].description) {
                        temp = projectDetails[index];
                        projectDetails[index] = projectDetails[index + 1];
                        projectDetails[index + 1] = temp;
                    }
                }
            }
            return projectDetails;

        case 'Author':
            for (let check = 0; check < projectDetails.length; ++check) {
                for (let index = 0; index < projectDetails.length - 1; ++index) {
                    let temp = null;
                    if (projectDetails[index].authorName > projectDetails[index + 1].authorName) {
                        temp = projectDetails[index];
                        projectDetails[index] = projectDetails[index + 1];
                        projectDetails[index + 1] = temp;
                    }
                }
            }
            return projectDetails;

        default:
            break;
    }

}

module.exports.issueTrackerPage = async (req, res) => {
    const collection = await mongoDB();
    const addedProject = await collection.find({ id: 'addedProject' }).toArray();
    return res.render('issueTracker', {
        title: "Issue Tracker",
        addedProject
    })
}

module.exports.createProject = (req, res) => {
    return res.render('createProject', {
        title: "Create Project"
    })
}

module.exports.addProjectToMongoDB = async (req, res) => {
    let formData = req.body;
    formData = { ...formData, id: "addedProject" }
    const collection = await mongoDB();
    collection.insertOne(formData, (err, data) => {
        if (err)
            throw err
        else if (data)
            console.log('data inserted')
    });
    res.redirect('/issueTracker')
}

module.exports.projectDetails = async (req, res) => {
    const collection = await mongoDB();
    let projectDetails = await collection.find({ id: 'addedProject' }).toArray();
    return res.render('projectDetails', {
        title: "Project Details",
        projectDetails
    })
}

module.exports.filterProjectDetails = async (req, res) => {
    const collection = await mongoDB();
    let projectDetails = await collection.find({ id: 'addedProject' }).toArray();
    const filterReq = req.body;

    if (filterReq.flexRadio === 'Project Title') {
        const filteredProjectDetails = filterBy('Title', projectDetails)
        return res.render('projectDetails', { title: "Project Details", projectDetails: filteredProjectDetails })
    }
    else if (filterReq.flexRadio === 'Project Description') {
        const filteredProjectDetails = filterBy('Description', projectDetails)
        return res.render('projectDetails', { title: "Project Details", projectDetails: filteredProjectDetails })
    }
    else if (filterReq.flexRadio === 'Project Author') {
        const filteredProjectDetails = filterBy('Author', projectDetails)
        return res.render('projectDetails', { title: "Project Details", projectDetails: filteredProjectDetails })
    }
}

module.exports.createAnIssue = async (req, res) => {
    const issueId = req.params;
    return res.render('createIssue', { title: "Create Issue", issueId })
}

module.exports.addAnIssue = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const issue = req.body;
    const bugId = req.params.id;
    const collection = await mongoDB();
    await collection.findOneAndUpdate({ _id: ObjectId(bugId) }, { '$push': { bugs: issue } });
    res.redirect('/issueTracker/projectDetails')
}
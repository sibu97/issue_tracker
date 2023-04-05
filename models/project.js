const mongoose = require('mongoose');

// project schema
const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    issues: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue'
        },
    ]
},{
    timestamps: true
})

// project collection
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
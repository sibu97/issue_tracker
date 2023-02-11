const MongoClient = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017/'
const url='mongodb+srv://sibu:221997@sibananda.j2qis.mongodb.net/issueTracker?retryWrites=true&w=majority'


async function getEmpData() {
    let client = await MongoClient.connect(url);
    
    let connection = client.db('issueTracker'); // Establish connection
    return connection.collection('IssueTracker2023'); // creating a collection and naming it also
}

module.exports = getEmpData;


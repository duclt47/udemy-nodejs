const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://localhost:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!!");
    }

    console.log("Connect susessfull!!!!");
    const db = client.db(databaseName);
    db.collection('tasks').insertMany([
        {
            task: 'task1',
            description: "this is task 1"
        },
        {
            task: 'task2',
            description: "this is task 2"
        },
        {
            task: 'task3',
            description: "this is task 3"
        },
    ])
})
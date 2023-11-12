const app = require('./app')
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary')


const connectDatabase = require('./config/database')



process.on('uncaughtException' , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})





connectDatabase()



const server = app.listen(4000 , () => {
    console.log(`Server is working on PORT: 4000`);
})





//Unhandled Promise Rejection
process.on('unhandledRejection' , err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhangled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})
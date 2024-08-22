const mongoose = require('mongoose');

const URI =process.env.MONGODB_URI;
const connectDB =async()=>{
    try {
        await mongoose.connect(URI);
        console.log("database is conected sucessfully to DB")
    } catch (error) {
        console.log("database conection is failed");
        process.exit(0);
    }
}
module.exports=connectDB;
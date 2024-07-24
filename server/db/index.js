const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set("strictQuery",false)

mongoose
.connect(process.env.Mongoose_URL)
.then(()=>console.log('db connected successfully'))
.catch((err)=>console.log(err.message))

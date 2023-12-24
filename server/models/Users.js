const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
    name: String,
    password: String
    

})

const EmployeeModel = mongoose.model("login", EmployeeSchema)
module.exports = EmployeeModel

const dealsdraySchema = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    gender: String,
    FormData: String,
    role: String,
    image: String,
    course: String,
    count: Number,
    path: String,
})

const dealsdrayModel = mongoose.model("employeedata", dealsdraySchema )
module.exports = dealsdrayModel


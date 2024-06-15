const mongoose = require("mongoose")
const item  = mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})
const task = mongoose.model('tasks',item)
module.exports = task
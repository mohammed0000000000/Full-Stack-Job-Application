const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    company:{
      type:String,
      required:[true, "You Must Provide A Name For Company"],
        maxLength:50,
        minLength:4,
    },
    position:{
        type:String,
        required:[true, "You Must Provide A Position For Job"],
        maxLength:30,
        minLength:4,
    },
    status:{
        type:String,
        enum:['Interview', 'Declined', 'Pending'],
        default:'Pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, "Please Provide a User"],
    }
},{timestamps:true});

module.exports = mongoose.model("Job",jobSchema);
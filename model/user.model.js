const mongoose = require('mongoose');

let userSchema = mongoose.Schema({

    Email : {
        type : String ,
        required : true,
        unique:true
    },
    Password : {

        type : String ,
        required : true

    },Route : [

        {
            id : mongoose.Types.ObjectId,
            WEEKEND_NAME : String ,
            DATE : String,
            WORK_ROUTE : {
                FORM : String,
                TO : String
            }
        }
    ]



})


module.exports = mongoose.model('user',userSchema);
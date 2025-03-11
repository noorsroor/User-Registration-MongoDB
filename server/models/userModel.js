const moongose = require('mongoose');


const userSchema = new moongose.Schema({
    email: {type: String, required:true ,unique:true},
    password:{type:String, required:true},
    isDeleted: {type: Boolean, default:false}
});

const User = moongose.model("User", userSchema);
module.exports = {User} ; 
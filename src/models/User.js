const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    user: String,
    userName: String,
    email: String,
    password: String
});


//Metodo para cifrar
 userSchema.methods.encryptPassword = async (password)=>{
    //indicamos cuantas veces queremos aplicar un algoritmo
   const salt = await bcrypt.genSalt(10);
   //con esto lo encryptamos el string
   return bcrypt.hash(password, salt);
};


userSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
}



module.exports = model('User', userSchema);
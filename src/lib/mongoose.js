const mongoose = require('mongoose')
require("dotenv").config();
//Conexion a mongonDB
const conectionBD = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Conectado a MongoDB')
    } catch(error) {
        console.log(error)
    }
};
module.exports = conectionBD;


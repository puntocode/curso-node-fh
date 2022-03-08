const mongoose = require('mongoose')

const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        })

        console.log('BD conectada')
    }catch(error){
        console.error(error);
        throw new Error('Error en la conexion de la BD')
    }
}

module.exports = {dbConnection};
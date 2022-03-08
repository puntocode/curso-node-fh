const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/conexion');


class Server{

    constructor(){
        this.app = express();  
        this.port = process.env.PORT;

        this.paths = {
            auth:     '/api/auth',
            user:     '/api/users',
            busqueda: '/api/buscar',
            category: '/api/categorias',
            producto: '/api/productos',
            uploads:  '/api/uploads',
        }


        //Conectar a la BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

        //aceptar archivos de api-rest
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }


    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.busqueda, require('../routes/buscar'));
        this.app.use(this.paths.category, require('../routes/categorias'));
        this.app.use(this.paths.producto, require('../routes/productos'));
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }

}


module.exports = Server;
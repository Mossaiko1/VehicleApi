import express from 'express';
import 'dotenv/config';
import dbConection from '../dataBase/config.js';
import { getVehicle, postVehicle, putVehicle, deleteVehicle } from '../controllers/vehicleControllers.js';

export default class Server {
    constructor() {
        this.app = express();
        this.pathVehicle = '/api/vehicle'; //link publico de la api
        this.middlewares();
        this.route();
        this.dbConnect();
        this.listen();
    }

    // Definir middlewares
    middlewares() {
        this.app.use(express.json()); // Para manejar JSON en las solicitudes
    }

    // Escuchar el servidor y especificar el puerto
    listen() { 
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT ${process.env.PORT}`);
        });
    }

    // Conectar a la base de datos
    async dbConnect() {
        try {
            await dbConection();
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
        }
    }

    // Definir rutas
    route() {
        this.app.get(this.pathVehicle, getVehicle);
        this.app.post(this.pathVehicle, postVehicle);
        this.app.put(this.pathVehicle, putVehicle);
        this.app.delete(`${this.pathVehicle}/:id`, deleteVehicle); // Corregido para concatenar correctamente la ruta
    }
}

import { model, Schema } from "mongoose";

//define eñ esquema de la coleccion 
const VehicleSchema =  new Schema({ 
    plate:{
        type: String,
        require: [true, 'plated is required'],
        unique: true,
        minlength: [5,'Min 5 caracters'],
        maxlength: [6, 'Max 6 caracters']
    },
    color:{
        type: String,
        require: [true ,'color is required'],
        minlength:[3,'Min 4 caracthers']

    },
    model:{
        type: Number,
        require: [true ,'model is required'],
    }
})

// creamos una coleccion y la exporto
export default model('Vehicle', VehicleSchema, 'vehicle' )  
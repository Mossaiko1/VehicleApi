import Vehicle from "../models/vehicle.js";

// Consultar en la base de datos - trae la información y la devuelve en una respuesta
export async function getVehicle(req, res) {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching vehicles data', details: error.message });
    }
}

export async function postVehicle(req, res) {
    const body = req.body; // Obtiene la información desde Postman o del formulario
    try {
        const vehicle = new Vehicle(body); // Crear el objeto
        await vehicle.save(); // Crear vehículo en Mongo
        res.status(201).json({ message: 'Vehicle created successfully', vehicle });
    } catch (error) {
        res.status(500).json({ error: 'Error creating vehicle', details: error.message });
    }
}

export async function putVehicle(req, res) {
    const { plate, color, model } = req.body;
    try {
        const updatedVehicle = await Vehicle.findOneAndUpdate({ plate: plate }, { color: color, model: model }, { new: true });
        if (!updatedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.status(202).json({ message: 'Vehicle updated successfully', updatedVehicle });
    } catch (error) {
        res.status(500).json({ error: 'Error updating vehicle', details: error.message });
    }
}

export async function deleteVehicle(req, res) {
    const _id = req.params.id;
    try {
        const deletedVehicle = await Vehicle.findByIdAndDelete(_id);
        if (!deletedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting vehicle', details: error.message });
    }
}

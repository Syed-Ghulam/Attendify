const WorkStation = require("../models/WorkStation");

const createWorkStation = async (req, res) =>{
    try{
        const workstation = await WorkStation.create(req.body);

        res.status(201).json({
            message: "WorkStation created Successfully",
            workstation
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const getWorkStation = async(req,res) =>{
    try{
        const workstations = await WorkStation.findAll();

        res.status(200).json(workstations);

    }catch(error){
        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createWorkStation,
    getWorkStation
}
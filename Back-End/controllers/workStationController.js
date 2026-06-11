const WorkStation = require("../models/WorkStation");

const createWorkStation = async (req, res) =>{
    try{
        const workstation = await WorkStation.create(req.body);

        res.status(201).json({
            message: "WorkStation created Successfully",
            workstation
        });
    } catch(error){
        if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                message: "IP Address already exists"
                });
            }
        res.status(500).json({
            message:"Error creating workStation",
            error
        });
    }
};

const getWorkStation = async(req,res) =>{
    try{
        const workstations = await WorkStation.findAll({
            where:{
                isDeleted: false
            }
        });

        res.status(200).json(workstations);

    }catch(error){
        res.status(500).json({
            message: error.message
        });

    }
};

const getWorkStationById = async (req, res) => {
    try {

        const workstation = await WorkStation.findByPk(
            req.params.id
        );

        if(!workstation){
            return res.status(404).json({
                message: "WorkStation not found"
            });
        }

        res.status(200).json(workstation);

    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const updateWorkStation = async (req, res) => {
    try {

        const workstation = await WorkStation.findByPk(
            req.params.id
        );

        if(!workstation){
            return res.status(404).json({
                message: "WorkStation not found"
            });
        }

        await workstation.update({
            ...req.body
        });

        res.status(200).json({
            message: "WorkStation updated successfully",
            workstation
        });

    } catch(error){
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteWorkStation = async (req, res) => {
    try {

        const workstation = await WorkStation.findByPk(
            req.params.id
        );

        if (!workstation) {
            return res.status(404).json({
                message: "WorkStation not found"
            });
        }

        await workstation.update({
            isDeleted: true,
            updatedBy: req.body.updatedBy
        });

        res.status(200).json({
            message: "WorkStation deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createWorkStation,
    getWorkStation,
    getWorkStationById,
    updateWorkStation,
    deleteWorkStation
}
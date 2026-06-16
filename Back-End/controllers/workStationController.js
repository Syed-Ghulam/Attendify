const WorkStation = require("../models/WorkStation");

const createWorkStation = async (req, res, next) =>{
    try{
        const workstation = await WorkStation.create({
            workstationName: req.body.workstationName,
            ipAddress: req.body.ipAddress,
            facility: req.body.facility,
            code: req.body.code,
            linenameNumber: req.body.linenameNumber,
            isActive: req.body.isActive,
            createdBy: req.user.userId,
            updatedBy: req.user.userId
        });

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
        next(error);
    }
};

const getWorkStation = async(req,res, next) =>{
    try{
        const workstations = await WorkStation.findAll({
            where:{
                isDeleted: false
            }
        });

        res.status(200).json(workstations);

    }catch(error){
     next(error);

    }
};

const getWorkStationById = async (req, res, next) => {
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
      next(error);
    }
};

const updateWorkStation = async (req, res, next) => {
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
            workstationName: req.body.workstationName,
            ipAddress: req.body.ipAddress,
            facility: req.body.facility,
            code: req.body.code,
            linenameNumber: req.body.linenameNumber,
            isActive: req.body.isActive,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "WorkStation updated successfully",
            workstation
        });

    } catch(error){
       next(error)
    }
};

const deleteWorkStation = async (req, res, next) => {
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
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "WorkStation deleted successfully"
        });

    } catch (error) {
        next(error)
    }
};

module.exports = {
    createWorkStation,
    getWorkStation,
    getWorkStationById,
    updateWorkStation,
    deleteWorkStation
}
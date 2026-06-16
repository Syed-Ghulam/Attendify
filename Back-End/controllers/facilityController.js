const Facility = require("../models/Facility");

const createFacility = async (req, res, next) => {
    try{

        const facility = await Facility.create({
            facilityName: req.body.facilityName,
            location: req.body.location,
            code: req.body.code,
            description: req.body.description,
            isActive: req.body.isActive,
            createdBy: req.user.userId,
            updatedBy: req.user.userId
        });

        res.status(201).json({
            message: "Facility created successfully",
            facility
        });
    } catch(error){
       next(error)
    }
};

const getFacility = async (req, res, next) => {
    try{
        const facilities = await Facility.findAll({
            where:{
                isDeleted:false
            }
        });

        res.status(200).json(facilities);
    } catch (error) {
       next(error)
    }
};

const getFacilityById = async(req, res, next) => {

    try{
        const facility = await Facility.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });

        if(!facility){
            return res.status(404).json({
                message:"Facility not found"
            });
        }
        res.status(200).json(facility);
    } catch(error){
        next(error)
    }
};

const updateFacility = async(req, res, next) => {

    try{

        const facility = await Facility.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });

        if(!facility){
            return res.status(404).json({
                message:"Facility not found"
            });
        }

        await facility.update({
            facilityName: req.body.facilityName,
            location: req.body.location,
            code: req.body.code,
            description: req.body.description,
            isActive: req.body.isActive,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message:"Facility updated successfully",
            facility
        });
    } catch(error) {
       next(error)
    }
};

const deleteFacility = async (req, res, next) => {
    try {

        const facility = await Facility.findByPk({
            where: {
                id: req.params.id,
                isDeleted:false
            }
        });

        if (!facility) {
            return res.status(404).json({
                message: "Facility not found"
            });
        }

        await facility.update({
            isDeleted: true,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "Facility deleted successfully"
        });

    } catch (error) {

      next(error)
    }
};

module.exports ={
    createFacility,
    getFacility,
    getFacilityById,
    updateFacility,
    deleteFacility
};
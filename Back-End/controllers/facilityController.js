const Facility = require("../models/Facility");

const createFacility = async (req, res) => {
    try{

        const facility = await Facility.create(req.body);

        res.status(201).json({
            message: "Facility created successfully",
            facility
        });
    } catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const getFacility = async (req, res) => {
    try{
        const facilities = await Facility.findAll({
            where:{
                isDeleted:false
            }
        });

        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getFacilityById = async(req, res) => {

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
        res.status(500).json({
            message: error.message
        });
    }
};

const updateFacility = async(req, res) => {

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
            ...req.body
        });

        res.status(200).json({
            message:"Facility updated successfully",
            facility
        });
    } catch(error) {
        res.status(500).json({
            message:error.message
        });
    }
};

const deleteFacility = async (req, res) => {
    try {

        const facility = await Facility.findByPk(
            req.params.id
        );

        if (!facility) {
            return res.status(404).json({
                message: "Facility not found"
            });
        }

        await facility.update({
            isDeleted: true,
            updatedBy: req.body.updatedBy
        });

        res.status(200).json({
            message: "Facility deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports ={
    createFacility,
    getFacility,
    getFacilityById,
    updateFacility,
    deleteFacility
};
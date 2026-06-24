const Line = require("../models/Line");
const sequelize = require("../config/db");

const createLine = async (req, res, next) => {
    try {

        const line = await Line.create({
            lineNameNumber: req.body.lineNameNumber,
            lineCode: req.body.lineCode,
            facility: req.body.facility,
            isActive: req.body.isActive,
            createdBy: req.user.userId,
            updatedBy: req.user.userId
        });

        res.status(201).json({
            message: "Line created successfully",
            line
        });

    } catch (error) {

    next(error);

    }
};

const getLines = async (req, res, next) => {
    try {

        const lines = await Line.findAll({
            where: {
                isDeleted: false
            },
            order: [["displayOrder", "ASC"]]
        });

        res.status(200).json(lines);

    } catch (error) {

      next(error);

    }
};

const getLineById = async (req, res, next) => {
    try {

       const line = await Line.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });

        if (!line) {
            return res.status(404).json({
                message: "Line not found"
            });
        }

        res.status(200).json(line);

    } catch (error) {

        next(error);

    }
};

const updateLine = async (req, res, next) => {
    try {

       const line = await Line.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });

        if (!line) {
            return res.status(404).json({
                message: "Line not found"
            });
        }

        await line.update({
            lineNameNumber: req.body.lineNameNumber,
            lineCode: req.body.lineCode,
            facility: req.body.facility,
            isActive: req.body.isActive,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "Line updated successfully",
            line
        });

    } catch (error) {

        next(error)

    }
};

const updateLineStatus = async (req, res, next) => {
    try {

        const line = await Line.findOne({
            where: {
                id: req.params.id,
                isDeleted: false
            }
        });

        if (!line) {
            return res.status(404).json({
                message: "Line not found"
            });
        }

        await line.update({
            isActive: req.body.isActive,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "Line status updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

const reorderLines = async (req, res, next) => {

    const transaction = await sequelize.transaction();

    try{

        const lines = req.body;

        await Promise.all(
            lines.map((line) =>
                Line.update(
                    {
                        displayOrder: line.displayOrder,
                        updatedBy: req.user.userId
                    },
                    {
                        where: {
                            id: line.id,
                            isDeleted: false
                        },
                        transaction
                    }
                )
            )
        );

        await transaction.commit();

        res.status(200).json({
            success: true,
            message: "Line order updated successfully"
        });
    } catch (error) {
        await transaction.rollback();
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const deleteLine = async (req, res, next) => {
    try {

        const line = await Line.findByPk(
            req.params.id
        );

        if (!line) {
            return res.status(404).json({
                message: "Line not found"
            });
        }

        await line.update({
            isDeleted: true,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "Line deleted successfully"
        });

    } catch (error) {

        next(error);
    }
};

module.exports = {
    createLine,
    getLines,
    getLineById,
    updateLine,
    updateLineStatus,
    reorderLines,
    deleteLine
};
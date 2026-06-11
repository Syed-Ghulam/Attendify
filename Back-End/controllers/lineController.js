const Line = require("../models/Line");

const createLine = async (req, res) => {
    try {

        const line = await Line.create(req.body);

        res.status(201).json({
            message: "Line created successfully",
            line
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getLines = async (req, res) => {
    try {

        const lines = await Line.findAll({
            where: {
                isDeleted: false
            }
        });

        res.status(200).json(lines);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getLineById = async (req, res) => {
    try {

        const line = await Line.findByPk(
            req.params.id
        );

        if (!line) {
            return res.status(404).json({
                message: "Line not found"
            });
        }

        res.status(200).json(line);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const updateLine = async (req, res) => {
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
            ...req.body
        });

        res.status(200).json({
            message: "Line updated successfully",
            line
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const deleteLine = async (req, res) => {
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
            updatedBy: req.body.updatedBy
        });

        res.status(200).json({
            message: "Line deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createLine,
    getLines,
    getLineById,
    updateLine,
    deleteLine
};
const { getgroups } = require("node:process");
const Group = require("../models/Group");

const createGroup = async(req, res) =>{
    try{
        const group = await Group.create({...req.body, createdBy : "Admin", updatedBy:"Admin"});

        res.status(201).json({
            message:"Group created successfully",
            group
        });
    } catch(error){
        console.log(error)
        res.status(500).json({
            messsage:"Error creating Group",
            error
        });
    }
};

const getGroups = async(req, res) =>{
    try{
       const groups = await Group.findAll({
        where: {
            isDeleted : false
        }
       });
       res.status(200).json(groups);
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error Fetching groups",
            error
        });
    }
};

const getGroupById = async(req, res) =>{
    try{

        const group = await Group.findOne({
            where: {
                id:req.params.id,
                isDeleted:false
            }
        });

        if(!group) {
            return res.status(404).json({
                message: "Group not found"
            });
        }

        res.status(200).json(group);
    } catch(error){
        res.status(500).json({
            message: "Error fetching group",
            error
        });
    }
};

const updateGroup = async (req, res) => {
    try{
    const group = await Group.findOne({
        where: {
            id: req.params.id,
            isDeleted:false
        }
    });
    if(!group) {
        return res.status(404).json({
            message:"Group not found"
        });
    }

    await group.update({...req.body, updatedBy: "Admin"});

    res.status(200).json({
        message: "Group updated successfully",
        group
    });
  } catch (error) {
    res.status(500).json({
        message: "Error updating group",
        error
    });
  }
};

const deleteGroup = async (req, res) =>{
    try{
        const group = await Group.findOne({
            where: {
                id : req.params.id,
                isDeleted: false
            }
        });

        if(!group) {
            return res.status(404).json({
                message:"Group not found"
            });
        }

        await group.update({
            isDeleted: true
        });

        res.status(200).json({
            message: "Group deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting group",
            error: error.message
        });
    }
}

module.exports = {
    createGroup,
    getGroups,
    getGroupById,
    updateGroup,
    deleteGroup
}

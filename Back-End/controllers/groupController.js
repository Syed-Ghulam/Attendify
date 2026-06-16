
const Group = require("../models/Group");

const createGroup = async(req, res, next) =>{
    try{
        console.log(req.body);
        const group = await Group.create({
            groupName: req.body.groupName,
            roleName: req.body.roleName,
            description: req.body.description,
            isActive: req.body.isActive, 
            createdBy: req.user.userId,
            updatedBy: req.user.userId
        });

        res.status(201).json({
            message:"Group created successfully",
            group
        });
    } catch(error){
        next(error);
    }
};

const getGroups = async(req, res, next) =>{
    try{
       const groups = await Group.findAll({
        where: {
            isDeleted : false
        }
       });
       res.status(200).json(groups);
    } catch(error){
        next(error);
    }
};

const getGroupById = async(req, res, next) =>{
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
        next(error);
    }
};

const updateGroup = async (req, res, next) => {
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

    

    await group.update({
        groupName: req.body.groupName,
        roleName: req.body.roleName,
        description: req.body.description,
        isActive: req.body.isActive,
        updatedBy: req.user.userId
    });

    res.status(200).json({
        message: "Group updated successfully",
        group
    });
  } catch (error) {
  next(error);
  }
};

const deleteGroup = async (req, res, next) =>{
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
            isDeleted: true,
            updatedBy: req.user.userId
        });

        res.status(200).json({
            message: "Group deleted successfully"
        });
    } catch (error) {
       next(error)
    }
}

module.exports = {
    createGroup,
    getGroups,
    getGroupById,
    updateGroup,
    deleteGroup
}

const { getgroups } = require("node:process");
const Group = require("../models/Group");

const createGroup = async(req, res) =>{
    try{
        const group = await Group.create(req.body);

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
       const groups = await Group.findAll();
       res.status(200).json(groups);
    } catch(error){
        console.log(error)
        res.status(500).json({
            message:"Error Fetching groups",
            error
        });
    }
};

module.exports = {
    createGroup,
    getGroups
}

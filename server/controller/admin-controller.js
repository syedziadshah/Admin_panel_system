const User =require("../models/user_model");
const Contact =require("../models/contact-model");
const contact = require("../models/contact-model");

//update single user by Id
const updateById =async(req,res)=>{
    try {
        const id=req.params.id;
       const updatedUserData= req.body;       
        const updatedData= await User.updateOne({_id:id},{
        $set:updatedUserData,
        });
        return res.status(200).json(updatedData);

    } catch (error) {
        next(error)
    }
}
//get single user
const getUserById =async(req ,res)=>{
    try {
        const id = req.params.id;
      const data = await User.findOne({_id:id} ,{password:0});
        return res.status(200).json(data)
        
    } catch (error) {
        next(error)
    }
}
// delete user logic
const deleteUserById =async(req ,res)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User deleted successfully"})
        
    } catch (error) {
        next(error)
    }
}
const deleteContactsById =async(req ,res)=>{
    try {
        const id = req.params.id;
        await contact.deleteOne({_id:id});
        return res.status(200).json({message:"contact deleted successfully"})
        
    } catch (error) {
        next(error)
    }
}
// getAllUsers logics
const getAllUser =async(req,res)=>{
try {
    const users = await User.find({}, {password:0});
    console.log(users);
    if(!users || users.length===0){

        return res.status(404).json({message:"Users not Found"})
    }
    return res.status(200).json(users);
} catch (error) {
    next(error)
}
}
const getAllContact=async(req ,res)=>{
    try {
        const contacts = await Contact.find();
        console.log(contacts)
        if(!contacts||contacts.length===0){
            return res.status(404).json({message:"conatct is found "})
        }
        return res.status(200).json(contacts);
            
    } catch (error) {
        next()
    }

}
module.exports ={getAllUser, getAllContact, deleteUserById, getUserById, updateById,deleteContactsById};
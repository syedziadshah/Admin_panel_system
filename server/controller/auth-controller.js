const User = require('../models/user_model');
const  bcrypt= require('bcryptjs');
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, phone, password, email } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        // const saltRound=10;
        // const  hash_password =await bcrypt.hash(password ,saltRound)

     const newUser= await User.create({ username, phone, password, email });
        res.status(201).json({ 
            mesg:"registeration will be successfull",
            token:await newUser.generateToken(),
            userId:newUser._id.toString()  });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const home = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
const login =async(req , res)=>{
    try {
        const {email ,password}= req.body
        const userExist =await  User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"invaild credentials"})
        }
      //  const user =await bcrypt.compare(password , userExist.password)
       const user = await userExist.comparePassword(password);  
      if(user){
            res.status(201).json({ 
                mesg:"login will be successfull",
                token:await userExist.generateToken(),
                userId:userExist._id.toString()  });
        }else{
            res.status(401).json({message:"inaavaild email or password"})
        }
        
    } catch (error) {
       // res.status(500).json({ message: "Server error" }); 
       next(error);  
    }
}
const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };

module.exports = { home, register, login,  user};

const contact =require('../models/contact-model')
const contactForm= async(req ,res)=>{
try {
    const response =req.body;
    await contact.create(response);
    return res.status(200).json({message:"sending message sucessfully"})
} catch (error) {
    return res.status(500).json({message:"sending message not deliver sucessfully"})
}
};
module .exports =contactForm;
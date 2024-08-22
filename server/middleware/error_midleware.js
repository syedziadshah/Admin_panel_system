const errorMidleware = (err ,req ,res ,next)=>{
const status =err.status || 500;
const message =err.message ||"Backend Error";
const extraDetails =err.extraDetails ||"error in the Backend";
return res.status(status).json({message ,extraDetails})
};
module.exports =errorMidleware; 
import { errorHandlingClass } from "../utils/error-class.utils.js";

export const errorHandling =(API)=>{
    return (req, res, next) => {
        API(req, res, next).catch((err)=>{
            console.log("error in error-handling-middleware", err);
            next (new errorHandlingClass("Internal Server Error", 500));
        });
    }
}


export const errorHandlerResponse = (err, req, res, next) => {
 if (err) { 
   res.status(err["statusCode"] || 400).json({
                message : "Internal Server Error",
                statusCode :err.statusCode ,  
                error :err.message, 
            });
}};
  
import { errorHandlingClass } from "../../utils/error-class.utils.js";
import author from "./../../../DB/models/author.model.js";

//CRUD

//createAuthor
export const createAuthors=async(req,res,next)=>{
    const {name,bio, birthday,books}=req.body;
    const newAuthor={name,bio,birthday,books};
    const nameExist=await author.findOne({name});
    if(nameExist){
        return next(new errorHandlingClass("this author is already exist",409));
    }
    const authorCreated=await author.create(newAuthor);
    res.status(201).json({msg:"author created successfully",authorCreated});
}

//getAuthors
export const getAuthor=async(req,res,next)=>{ 
    const {id} = req.params;
    const selectedAuthor=await author.findById(id);
    if(!selectedAuthor){
        return next(new errorHandlingClass("author not found",404));
    }
    res.status(200).json({msg:"author data",selectedAuthor});
}

//getAllAuthors
export const getAllAuthors = async(req,res,next)=>{
    const {name,bio,limit,page}=req.query;
    let query={};
    if(name){
        query.name={$regex:name,$options:"i"};
    }
    if(bio){
        query.bio={$regex:bio,$options:"i"};
    }
    const authors = await author.find(query).populate([{path:"books"}]).limit(limit).skip((page - 1) * limit);
    if(!authors){
        return next(new errorHandlingClass("author not found",404));
    }
    res.status(200).json({msg:"author data",authors});
}


//updateAuthor
export const updateAuthor=async(req,res,next)=>{
    const {id }=req.params;
    const {name,bio,birthday,books}=req.body;
    const updatedAuthor={name,bio,birthday,books};
    const authors = await author.findByIdAndUpdate(id,{$set:updatedAuthor,$inc:{__v:1}},{new:true});
    if(!authors){
        return next(new errorHandlingClass("author not found",404));
    }
    res.status(201).json({msg:"author updated successfully",authors});
}

//deleteAuthor
export const deleteAuthor=async(req,res,next)=>{
    const {id} = req.params;
    const deleteAuthor=await author.findByIdAndDelete(id);
    if(!deleteAuthor){
        return next(new errorHandlingClass("author not found",404));
    }
    res.status(200).json({msg:"author deleted successfully"});
} 
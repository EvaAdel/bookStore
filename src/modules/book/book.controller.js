 import { errorHandlingClass } from "../../utils/error-class.utils.js";
import book from "./../../../DB/models/book.model.js";

//CRUD

//createBooks
export const createBooks=async(req,res,next)=>{
    const {title,content,author,publishedDate}=req.body;
    const newBook={title,content,author,publishedDate};
    const titleExist=await book.findOne({title});
    if(titleExist){
        return next(new errorHandlingClass("Book with the same title already exist",409));
    }
    const bookCreated=await book.create(newBook);
    res.status(201).json({msg:"book created successfully",bookCreated});
}

//getBook  
export const getBook=async(req,res,next)=>{
    const {id}=req.params;
    const selectedBook=await book.findById(id);
    if (!selectedBook) {
        return next(new errorHandlingClass("Book not found",404));
    }
    res.status(200).json({msg:"book data",selectedBook});
}

//getAllBooks
export const getAllBooks=async(req,res,next)=>{
    const {title,author,limit,page}=req.query;
    let query={};
    if(title){
        query.title={$regex:title,$options:"i"};
    }
    if(author){
        query.author={$regex:author,$options:"i"};
    }
    const books = await book.find(query).limit(limit).skip((page - 1) * limit);
    if (!books) {
        return next(new errorHandlingClass("Book not found",404));
    }
    res.status(200).json({msg:"book name is",books});
}
 

//updateBook

export const updateBook=async(req,res,next)=>{
    const {id}=req.params;
    const {title,content,author,publishedDate}=req.body;
    const updatedBook={title,content,author,publishedDate};
    const books = await book.findByIdAndUpdate(id,{$set:updatedBook,$inc:{__v:1}},{new:true});
    if(!books){
        return next(new errorHandlingClass("Book not found",404));}
        res.status(201).json({msg:"book updated successfully",books});
    }
     


    //deleteBook 

    export const deleteBook=async(req,res,next)=>{
        const {id}=req.params;
        const deleteBook=await book.findByIdAndDelete(id);
        if(!deleteBook){
            return next(new errorHandlingClass("Book not found",404));} 
        res.status(200).json({msg:"book deleted successfully"});
    }
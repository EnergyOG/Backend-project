import {model, Schema} from "mongoose";

 const booksSchema =  new Schema({
    tags:{
        type: [String],
        minlength: 1,
        maxlength:100,
        required: true
    },
    isPublished: Boolean,
    price : {
        type: Number,
        min: 1,
        max:1000 
    },
    author: String
})

const booksModel = model('Books', booksSchema);

export default booksModel;
